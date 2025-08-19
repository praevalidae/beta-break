import fitz  # PyMuPDF
from PIL import Image
import os
import sys

def slice_pdf_pages_with_margin(pdf_path, output_folder, margin_inches=1):
    """
    Slices each page of a PDF, after removing a 1-inch margin from each edge,
    into a 3-column, 2-row grid and saves the resulting images.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"Error: Could not open PDF file. {e}")
        return

    # Assuming a standard print resolution of 300 DPI (dots per inch)
    dpi = 300
    top_margin_pixels = int(0.62 * dpi)
    side_margin_pixels = int(1.4 * dpi)

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        
        # Get the page as a high-resolution image
        pix = page.get_pixmap(matrix=fitz.Matrix(dpi / 72, dpi / 72))
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

        # Get the original image dimensions
        width, height = img.size
        
        # Calculate the bounding box for the margin crop
        left = side_margin_pixels
        upper = top_margin_pixels
        right = width - side_margin_pixels
        lower = height - top_margin_pixels
        
        # Crop the image to remove the 1-inch margin
        try:
            cropped_img_with_margin = img.crop((left, upper, right, lower))
        except Exception as e:
            print(f"Warning: Could not apply margin crop to page {page_num+1}. The page might be too small. Skipping.")
            continue
            
        cropped_width, cropped_height = cropped_img_with_margin.size
        
        # Define grid dimensions
        grid_rows = 2
        grid_cols = 3
        
        # Calculate the size of each grid cell based on the new dimensions
        cell_width = cropped_width // grid_cols
        cell_height = cropped_height // grid_rows

        for row in range(grid_rows):
            for col in range(grid_cols):
                # Calculate the bounding box for the current cell
                left_cell = col * cell_width
                upper_cell = row * cell_height
                right_cell = left_cell + cell_width
                lower_cell = upper_cell + cell_height
                
                # Crop the image again to get the grid part
                final_cropped_img = cropped_img_with_margin.crop((left_cell, upper_cell, right_cell, lower_cell))
                
                # Save the final image
                output_filename = f"page_{page_num+1}_row_{row+1}_col_{col+1}.jpg"
                output_path = os.path.join(output_folder, output_filename)
                
                final_cropped_img.save(output_path, "JPEG")
                print(f"Saved {output_path}")
                
    doc.close()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python script_name.py <input_pdf_path> <output_folder_path>")
    else:
        input_pdf = sys.argv[1]
        output_folder = sys.argv[2]
        slice_pdf_pages_with_margin(input_pdf, output_folder)