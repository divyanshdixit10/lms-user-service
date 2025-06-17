# Placement Drive Images Guide

## 📁 Directory Structure
Organize your placement drive images by company in this directory: `client/public/images/placement-drives/`

## 🏢 Company Directories
Each company should have its own folder with multiple placement drive images:

```
client/public/images/placement-drives/
├── tcs/
│   ├── tcs-drive-2024-1.jpg
│   ├── tcs-drive-2024-2.jpg
│   ├── tcs-drive-2024-3.jpg
│   └── tcs-drive-2024-4.jpg
├── infosys/
│   ├── infosys-drive-2024-1.jpg
│   ├── infosys-drive-2024-2.jpg
│   └── infosys-drive-2024-3.jpg
├── wipro/
│   ├── wipro-drive-2024-1.jpg
│   ├── wipro-drive-2024-2.jpg
│   └── wipro-drive-2024-3.jpg
├── cognizant/
│   ├── cognizant-drive-2024-1.jpg
│   └── cognizant-drive-2024-2.jpg
├── accenture/
│   ├── accenture-drive-2024-1.jpg
│   └── accenture-drive-2024-2.jpg
├── hcl/
│   ├── hcl-drive-2024-1.jpg
│   └── hcl-drive-2024-2.jpg
└── [other-companies]/
    ├── company-drive-1.jpg
    └── company-drive-2.jpg
```

## 📐 Image Specifications

### **Recommended Dimensions:**
- **Width:** 1200px - 1920px
- **Height:** 800px - 1080px
- **Aspect Ratio:** 3:2 or 16:9
- **Format:** JPG, PNG, or WebP
- **File Size:** Under 300KB for optimal loading

### **Content Guidelines:**
- **High-quality** photos from actual placement drives
- **Group photos** of selected students with company representatives
- **Award ceremonies** and offer letter distributions
- **Campus recruitment** events and interviews
- **Good lighting** and clear visibility of faces
- **Professional appearance** - formal attire preferred

## 🎯 Naming Convention
Use descriptive filenames for easy organization:

### **Format:** `[company]-drive-[year]-[number].jpg`
**Examples:**
- `tcs-drive-2024-1.jpg`
- `infosys-drive-2024-2.jpg`
- `wipro-drive-2023-3.jpg`

### **Alternative Format:** `[company]-[event-type]-[date].jpg`
**Examples:**
- `tcs-campus-recruitment-jan2024.jpg`
- `infosys-offer-ceremony-mar2024.jpg`
- `wipro-interview-session-feb2024.jpg`

## 🏢 Supported Companies
Currently configured companies (create folders as needed):

### **Tier 1 Companies:**
- **TCS** (`tcs/`)
- **Infosys** (`infosys/`)
- **Wipro** (`wipro/`)
- **Cognizant** (`cognizant/`)
- **Accenture** (`accenture/`)
- **HCL** (`hcl/`)

### **Add More Companies:**
Create new folders for additional companies:
- `tech-mahindra/`
- `capgemini/`
- `ibm/`
- `microsoft/`
- `google/`
- `amazon/`
- `startups/`
- `product-companies/`

## 🔄 How It Works on Website

### **Display Features:**
- **Company-wise Carousel** - Each company shows multiple images in rotation
- **Responsive Grid** - Adapts to different screen sizes
- **Hover Effects** - Interactive image previews
- **Company Logos** - Displays alongside placement images
- **Auto-rotation** - Images change automatically every 4 seconds

### **Section Layout:**
1. **Section Title** - "Our Placement Drives"
2. **Company Tabs** - Click to view specific company images
3. **Image Gallery** - Multiple images per company in carousel format
4. **Statistics** - Number of students placed per company

## 🚀 Quick Setup

### **Step 1:** Create Company Folders
```bash
mkdir tcs infosys wipro cognizant accenture hcl
```

### **Step 2:** Add Images
Place 2-5 images per company folder with proper naming

### **Step 3:** Refresh Website
Images will automatically appear in the placement drives section

## 💡 Best Practices

### **Image Quality:**
- Use **high-resolution** original photos
- Ensure **good lighting** and clear faces
- **Crop appropriately** to focus on main subjects
- **Compress images** to reduce file size without quality loss

### **Content Variety:**
- **Group photos** with company representatives
- **Individual photos** of top performers
- **Ceremony moments** - offer letter distribution
- **Interview sessions** and selection processes
- **Celebration moments** after successful placements

### **Organization:**
- **Consistent naming** across all companies
- **Chronological order** - latest images first
- **Quality over quantity** - select best photos only
- **Regular updates** - add new placement drive images

## 🔧 Technical Notes

### **Automatic Detection:**
- The website automatically scans company folders
- Displays companies that have images
- Handles missing images gracefully

### **Performance:**
- Images are lazy-loaded for better performance
- Optimized for mobile and desktop viewing
- Cached for faster subsequent loads

### **Fallback:**
- If no images found, shows company logo only
- Graceful handling of missing or corrupted images 