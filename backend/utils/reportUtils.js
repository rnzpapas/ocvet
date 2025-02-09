import PDFDocument from 'pdfkit'

export const generatePdf = (res, title = "", headers = [], data = [], filename = "exportedfile") => {
    const doc = new PDFDocument({ margin: 30 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    doc.pipe(res);

    doc.fontSize(18).text(title, { align: "center", underline: true });
    doc.moveDown(2);

    const startX = 50; 
    let y = doc.y;

    const totalWidth = 550;  
    const columnWidths = Array(headers.length).fill(totalWidth / headers.length); 

    doc.font("Helvetica-Bold").fontSize(12);
    let x = startX;
    headers.forEach((header, index) => {
        doc.text(header, x, y, { width: columnWidths[index], align: "center" });
        x += columnWidths[index];
    });

    y += 20; 
    doc.moveTo(startX, y).lineTo(startX + totalWidth, y).stroke(); 
    y += 5;

    doc.font("Helvetica").fontSize(10);
    data.forEach((row) => {
        x = startX;
        Object.values(row).forEach((value, index) => {
            doc.text(value.toString(), x, y, { width: columnWidths[index], align: "center" });
            x += columnWidths[index];
        });
        y += 20; 


        doc.moveTo(startX, y).lineTo(startX + totalWidth, y).stroke();
        y += 5;
    });

    doc.end();
};
