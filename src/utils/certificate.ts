import { jsPDF } from 'jspdf';

/* ─── Palette ──────────────────────────────────────────────────────────
   NAVY  = app background color, used for borders and headings
   RED   = module name highlight
   DARK  = main body text on white
   MID   = secondary / label text
   WHITE = background
──────────────────────────────────────────────────────────────────────── */
const NAVY  = [10,  15,  25]  as const;
const RED   = [200, 30,  50]  as const;
const DARK  = [20,  25,  40]  as const;
const MID   = [110, 115, 130] as const;

const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload  = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

export const generateCertificate = async (userName: string, moduleName: string) => {

    // A4 landscape: 297 × 210 mm
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const W = 297, H = 210;
    const CX = W / 2; // 148.5

    /* ── 1. Pure white background ─────────────────────────────────── */
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, W, H, 'F');

    /* ── 2. Borders (navy) ───────────────────────────────────────── */
    doc.setDrawColor(...NAVY);
    doc.setLineWidth(3);
    doc.rect(8, 8, W - 16, H - 16);        // outer thick border

    doc.setLineWidth(0.5);
    doc.rect(13, 13, W - 26, H - 26);      // inner thin border

    /* ── 3. Logo (centered, white bg — no colored band) ─────────── */
    let logoBottomY = 18; // fallback if no logo
    try {
        const img = await loadImage('/logo.png');
        const maxW = 45, maxH = 28;
        let lw = maxW;
        let lh = (img.naturalHeight / img.naturalWidth) * lw;
        if (lh > maxH) { lh = maxH; lw = (img.naturalWidth / img.naturalHeight) * lh; }
        const lx = CX - lw / 2;
        const ly = 18;
        // White rectangle behind logo ensures clean render regardless of PNG background
        doc.setFillColor(255, 255, 255);
        doc.rect(lx - 1, ly - 1, lw + 2, lh + 2, 'F');
        doc.addImage(img, 'PNG', lx, ly, lw, lh);
        logoBottomY = ly + lh + 4;
    } catch {
        // Fallback: text logo
        doc.setTextColor(...NAVY);
        doc.setFontSize(26);
        doc.setFont('helvetica', 'bold');
        doc.text('CyberLab', CX, 32, { align: 'center' });
        logoBottomY = 36;
    }

    /* ── 4. "CERTIFICATE OF COMPLETION" title ────────────────────── */
    const titleY = Math.max(logoBottomY + 4, 52);
    doc.setTextColor(...NAVY);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICATE OF COMPLETION', CX, titleY, { align: 'center' });

    // Decorative lines flanking the title
    const titleW = doc.getTextWidth('CERTIFICATE OF COMPLETION');
    const lineY   = titleY + 3;
    const lineGap = 4;
    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.5);
    doc.line(18,          lineY, CX - titleW / 2 - lineGap, lineY);
    doc.line(CX + titleW / 2 + lineGap, lineY, W - 18, lineY);

    /* ── 5. Body copy ────────────────────────────────────────────── */
    const bodyStart = titleY + 16;

    doc.setFontSize(10);
    doc.setTextColor(...MID);
    doc.setFont('helvetica', 'normal');
    doc.text('This document certifies that', CX, bodyStart, { align: 'center' });

    // Student name
    const nameY = bodyStart + 14;
    doc.setFontSize(28);
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'bold');
    doc.text(userName.toUpperCase(), CX, nameY, { align: 'center' });

    // Underline beneath name
    const nameW2 = doc.getTextWidth(userName.toUpperCase());
    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.4);
    doc.line(CX - nameW2 / 2, nameY + 2, CX + nameW2 / 2, nameY + 2);

    // Connector text
    doc.setFontSize(10);
    doc.setTextColor(...MID);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully completed the practical training of', CX, nameY + 14, { align: 'center' });

    // Module name — RED
    doc.setFontSize(20);
    doc.setTextColor(...RED);
    doc.setFont('helvetica', 'bold');
    doc.text(moduleName, CX, nameY + 28, { align: 'center' });

    /* ── 6. Footer signature blocks ──────────────────────────────── */
    const footerY = H - 42;  // fixed distance from bottom

    // ── Left: Director ──
    const LX = 95;
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'bold');
    doc.text('CyberLab Academy', LX, footerY, { align: 'center' }); // value ABOVE line

    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.4);
    doc.line(LX - 38, footerY + 4, LX + 38, footerY + 4);          // signature line

    doc.setFontSize(8);
    doc.setTextColor(...MID);
    doc.setFont('helvetica', 'normal');
    doc.text('Director, CyberLab Academy', LX, footerY + 9, { align: 'center' }); // label BELOW line

    // ── Right: Issue Date ──
    const RX = W - 95;
    const today = new Date().toLocaleDateString('en-US');
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.setFont('helvetica', 'bold');
    doc.text(today, RX, footerY, { align: 'center' });              // date ABOVE line

    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.4);
    doc.line(RX - 38, footerY + 4, RX + 38, footerY + 4);          // signature line

    doc.setFontSize(8);
    doc.setTextColor(...MID);
    doc.setFont('helvetica', 'normal');
    doc.text('Issue Date', RX, footerY + 9, { align: 'center' });   // label BELOW line

    doc.save(`Certificate_${moduleName.replace(/\s+/g, '_')}.pdf`);
};
