import { jsPDF } from 'jspdf';

const menuCategories = [
  {
    name: 'Tapas',
    items: [
      { name: 'Patatas Bravas', description: 'Crispy potatoes with spicy tomato sauce', price: '8' },
      { name: 'Gambas al Ajillo', description: 'Garlic shrimp with olive oil', price: '12' },
      { name: 'Jamón Ibérico', description: 'Premium Iberian ham', price: '16' }
    ]
  },
  {
    name: 'Main Courses',
    items: [
      { name: 'Paella Valenciana', description: 'Traditional Spanish rice with seafood', price: '24' },
      { name: 'Cochinillo Asado', description: 'Roasted suckling pig with crispy skin', price: '28' },
      { name: 'Lubina a la Sal', description: 'Salt-baked sea bass', price: '26' }
    ]
  },
  {
    name: 'Desserts',
    items: [
      { name: 'Crema Catalana', description: 'Spanish custard with caramelized sugar', price: '8' },
      { name: 'Churros con Chocolate', description: 'Traditional churros with hot chocolate', price: '7' }
    ]
  }
];

export const generatePDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Set background color
  doc.setFillColor(252, 250, 248); // Warm white
  doc.rect(0, 0, 210, 297, 'F');
  
  // Add decorative border
  doc.setDrawColor(232, 93, 69); // primary-500
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 277);
  doc.rect(12, 12, 186, 273);
  
  // Restaurant name with custom styling
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(28, 25, 23); // stone-900
  doc.text('La Casa Bonita', 105, 35, { align: 'center' });
  
  // Decorative line under title
  doc.setLineWidth(1);
  doc.line(45, 40, 165, 40);
  
  // Subtitle
  doc.setFont("helvetica", "italic");
  doc.setFontSize(16);
  doc.setTextColor(87, 83, 78); // stone-600
  doc.text('Authentic Spanish Cuisine', 105, 50, { align: 'center' });
  
  let yPosition = 70;
  
  menuCategories.forEach(category => {
    // Category header with background
    doc.setFillColor(232, 93, 69, 0.1); // primary-500 with opacity
    doc.roundedRect(20, yPosition - 5, 170, 12, 2, 2, 'F');
    
    // Category name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(232, 93, 69); // primary-500
    doc.text(category.name, 105, yPosition + 2, { align: 'center' });
    yPosition += 20;
    
    // Items
    category.items.forEach(item => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
        // Add border to new page
        doc.setDrawColor(232, 93, 69);
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 190, 277);
        doc.rect(12, 12, 186, 273);
      }
      
      // Item name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(28, 25, 23);
      doc.text(item.name, 25, yPosition);
      
      // Price
      doc.setFont("helvetica", "bold");
      doc.text(`€${item.price}`, 185, yPosition, { align: 'right' });
      
      // Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(87, 83, 78);
      doc.text(item.description, 25, yPosition + 6);
      
      // Decorative dots between name and price
      doc.setLineDashPattern([0.5, 1.5]);
      doc.setDrawColor(200, 200, 200);
      doc.line(25 + doc.getTextWidth(item.name) + 5, yPosition - 1, 
               180 - doc.getTextWidth(`€${item.price}`) - 5, yPosition - 1);
      
      yPosition += 15;
    });
    
    yPosition += 10;
  });
  
  // Footer
  const footerY = 270;
  doc.setDrawColor(232, 93, 69);
  doc.setLineWidth(0.5);
  doc.line(30, footerY, 180, footerY);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(87, 83, 78);
  doc.text('123 Main Street, Your City, ST 12345', 105, footerY + 7, { align: 'center' });
  doc.text('(555) 123-4567 • www.lacasabonita.com', 105, footerY + 14, { align: 'center' });
  
  // Save the PDF
  doc.save('la-casa-bonita-menu.pdf');
};