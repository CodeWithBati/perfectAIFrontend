export const directoryType = [
  { name: "" },
  { name: "Free" },
  { name: "Freemium" },
  { name: "Discount Code" },
  { name: "Paid" },
];

export const directoryCategory = [
  { name: "Writing and Content Creation" },
  { name: "Customer Support and Chatbots" },
  { name: "Marketing and Sales Automation" },
  { name: "Software Development" },
  { name: "Data Analysis and Visualization" },
  { name: "Education and E-learning" },
  { name: "Health and Fitness" },
  { name: "Finance and Accounting" },
  { name: "Image Editing and Design" },
  { name: "Video Editing and Production" },
  { name: "Music and Audio Production" },
  { name: "Productivity and Workflow Automation" },
  { name: "Search and Information Retrieval" },
  { name: "Voice and Speech Recognition" },
  { name: "Project Management" },
  { name: "E-commerce Solutions" },
  { name: "Human Resources and Recruitment" },
  { name: "Legal and Compliance" },
  { name: "Social Media Management" },
  { name: "Healthcare Applications" },
  { name: "Security and Fraud Detection" },
  { name: "Translation and Language Services" },
  { name: "Gaming and Entertainment" },
  { name: "Environmental and Sustainability Solutions" },
  { name: "Real Estate Tools" },
  { name: "Automotive Industry" },
  { name: "Travel and Hospitality" },
  { name: "Agriculture Technology" },
  { name: "Supply Chain and Logistics" },
  { name: "Manufacturing Automation" },
  { name: "Augmented and Virtual Reality" },
  { name: "AI Research and Development" },
  { name: "Personal Assistants" },
  { name: "Customer Relationship Management (CRM)" },
  { name: "Content Moderation" },
  { name: "Virtual Event Management" },
  { name: "Remote Work Collaboration" },
  { name: "Financial Forecasting" },
  { name: "Sentiment Analysis" },
  { name: "Language Learning" },
  { name: "Behavioral Analytics" },
  { name: "Email Marketing" },
  { name: "Recommendation Systems" },
];


export const directoryFilterSortBy = [
  { name: 'Featured' },
  { name: 'New' },
  { name: 'Popular' },
  { name: 'Top Rated' },
]

export const cleanObject = (obj) => {
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.filter((item) => item !== "");
    } else {
      return Object.fromEntries(
        Object.entries(obj)
          .map(([key, value]) => [key, cleanObject(value)])
          .filter(([_, value]) => value !== "")
      );
    }
  }

  return obj;
};


export const createDirectorySlugName = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

export const reactQuillModuleSettings = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [
      { indent: "-1" },
      { indent: "+1" },
    ],

  ],
};

export const reactQuillFormatSettings = [
  "header",
  "height",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "color",
  "bullet",
  "indent",
  "align",
  "size",
]

export const truncateWithEllipsis = (str, maxLength) => {
  if (typeof str !== 'string' || typeof maxLength !== 'number') {
    throw new Error('Invalid input: str must be a string and maxLength must be a number.');
  }

  if (str.length <= maxLength) {
    return str;
  }

  const truncateLength = maxLength > 3 ? maxLength - 3 : maxLength;
  return str.substring(0, truncateLength) + '...';
}
