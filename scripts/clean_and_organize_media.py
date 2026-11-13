import os
import zipfile
import cv2
import numpy as np
from PIL import Image

ZIP_PATH = "/home/abhishek-vishwakarma/Documents/laxmiEnterprises/laxmi02/public/LAXM! Enterprises -1-001.zip"
OUTPUT_DIR = "/home/abhishek-vishwakarma/Documents/laxmiEnterprises/laxmi02/public/assets/4life"
FFMPEG_PATH = "/home/abhishek-vishwakarma/.local/bin/ffmpeg"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# List of 14 images known to have the Samsung Galaxy A32 Quad Camera watermark
WM_INFO = {
    "IMG-20261109-WA0018.jpg": (45, 1440),
    "IMG-20261109-WA0020.jpg": (45, 1440),
    "IMG-20261109-WA0021.jpg": (45, 561),
    "IMG-20261109-WA0022.jpg": (45, 561),
    "IMG-20261109-WA0023.jpg": (45, 561),
    "IMG-20261109-WA0024.jpg": (45, 1440),
    "IMG-20261109-WA0025.jpg": (45, 1442),
    "IMG-20261109-WA0026.jpg": (45, 561),
    "IMG-20261109-WA0029.jpg": (45, 561),
    "IMG-20261109-WA0030.jpg": (45, 1440),
    "IMG-20261109-WA0031.jpg": (45, 561),
    "IMG-20261109-WA0032.jpg": (45, 561),
    "IMG-20261109-WA0033.jpg": (45, 1440),
    "IMG-20261109-WA0034.jpg": (45, 1440),
}

def remove_watermark(img_bgr, ix, iy):
    h, w, _ = img_bgr.shape
    # Bounding box of the watermark text + logo
    bx1 = max(0, ix - 10)
    by1 = max(0, iy - 12)
    bx2 = min(w, ix + 365)
    by2 = min(h, iy + 130)

    roi = img_bgr[by1:by2, bx1:bx2]
    gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)

    # Detect white/high-contrast watermark strokes
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (9, 9))
    tophat = cv2.morphologyEx(gray_roi, cv2.MORPH_TOPHAT, kernel)

    _, th1 = cv2.threshold(gray_roi, 160, 255, cv2.THRESH_BINARY)
    _, th2 = cv2.threshold(tophat, 25, 255, cv2.THRESH_BINARY)
    combined = cv2.bitwise_or(th1, th2)

    # Dilate slightly to cover font anti-aliased edge shadows
    dk = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask_roi = cv2.dilate(combined, dk, iterations=2)

    full_mask = np.zeros((h, w), dtype=np.uint8)
    full_mask[by1:by2, bx1:bx2] = mask_roi

    # Inpaint with Telea
    cleaned = cv2.inpaint(img_bgr, full_mask, 5, cv2.INPAINT_TELEA)
    return cleaned

def process_media():
    print(f"Opening zip file: {ZIP_PATH}")
    with zipfile.ZipFile(ZIP_PATH, 'r') as zf:
        for member in zf.infolist():
            filename = os.path.basename(member.filename)
            if not filename:
                continue

            # Extract to memory
            data = zf.read(member.filename)

            if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                # Decode image with OpenCV
                nparr = np.frombuffer(data, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                base_name = os.path.splitext(filename)[0]
                # Short name like WA0021
                short_name = base_name.replace("IMG-20261109-", "")

                if filename in WM_INFO:
                    ix, iy = WM_INFO[filename]
                    print(f"Removing watermark from {filename} ({short_name})...")
                    cleaned_img = remove_watermark(img, ix, iy)
                else:
                    print(f"Processing clean image {filename} ({short_name})...")
                    cleaned_img = img

                # Save clean JPG
                jpg_out = os.path.join(OUTPUT_DIR, f"{short_name}.jpg")
                cv2.imwrite(jpg_out, cleaned_img, [cv2.IMWRITE_JPEG_QUALITY, 92])

                # Convert to WebP using PIL for superior compression
                rgb_img = cv2.cvtColor(cleaned_img, cv2.COLOR_BGR2RGB)
                pil_img = Image.fromarray(rgb_img)
                webp_out = os.path.join(OUTPUT_DIR, f"{short_name}.webp")
                pil_img.save(webp_out, "WEBP", quality=88)

            elif filename.lower().endswith(('.mp4', '.mov')):
                vid_out = os.path.join(OUTPUT_DIR, "4life-walkthrough.mp4")
                print(f"Writing video to {vid_out}...")
                with open(vid_out, 'wb') as f_out:
                    f_out.write(data)

    # Extract video poster frame
    vid_file = os.path.join(OUTPUT_DIR, "4life-walkthrough.mp4")
    poster_jpg = os.path.join(OUTPUT_DIR, "4life-video-poster.jpg")
    poster_webp = os.path.join(OUTPUT_DIR, "4life-video-poster.webp")
    if os.path.exists(vid_file) and os.path.exists(FFMPEG_PATH):
        print("Extracting video poster frame at 00:00:20...")
        os.system(f"{FFMPEG_PATH} -y -ss 00:00:20 -i '{vid_file}' -vframes 1 '{poster_jpg}' > /dev/null 2>&1")
        if os.path.exists(poster_jpg):
            im = Image.open(poster_jpg)
            im.save(poster_webp, "WEBP", quality=90)
            print("Video poster generated.")

    print(f"Media processing complete! Check files in {OUTPUT_DIR}")

if __name__ == "__main__":
    process_media()
