import { jsPDF } from 'jspdf';

export const generateCertificate = (userName: string, moduleName: string) => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    // Background color (very dark blue/black)
    doc.setFillColor(10, 15, 25);
    doc.rect(0, 0, 297, 210, 'F');

    // Border (Accent color)
    doc.setDrawColor(0, 243, 255); // Neon Cyan
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Subtle inner border
    doc.setDrawColor(0, 243, 255);
    doc.setLineWidth(0.5);
    doc.rect(15, 15, 267, 180);

    // Logo / Title area
    doc.setTextColor(0, 243, 255);
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.text('CyberLab', 148.5, 50, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('CERTIFICATE OF COMPLETION', 148.5, 70, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(150, 150, 150);
    doc.text('This document certifies that', 148.5, 95, { align: 'center' });

    // User Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.text(userName.toUpperCase(), 148.5, 115, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(150, 150, 150);
    doc.text('has successfully passed the practical training of', 148.5, 135, { align: 'center' });

    // Module Name
    doc.setTextColor(255, 100, 255); // Magenta/Accent color
    doc.setFontSize(24);
    doc.text(moduleName, 148.5, 155, { align: 'center' });

    // Footer
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.2);
    doc.line(70, 180, 130, 180);
    doc.line(167, 180, 227, 180);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('CyberLab Director', 100, 185, { align: 'center' });
    doc.text('Issue Date', 197, 185, { align: 'center' });

    const today = new Date().toLocaleDateString('en-US');
    doc.setTextColor(200, 200, 200);
    doc.text(today, 197, 192, { align: 'center' });

    // Official Seal effect
    doc.setDrawColor(0, 243, 255);
    doc.setLineWidth(0.5);
    doc.circle(50, 50, 15);
    doc.setFontSize(8);
    doc.text('CYBERLAB', 50, 50, { align: 'center', angle: -45 } as any);

    doc.save(`Certificate_${moduleName.replace(/\s+/g, '_')}.pdf`);
};
