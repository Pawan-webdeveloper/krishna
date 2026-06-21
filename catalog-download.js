(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnDownloadCatalog');
    const status = document.getElementById('downloadStatus');
    const textEl = document.getElementById('downloadText');
    const iconEl = document.getElementById('downloadIcon');
    const mockup = document.getElementById('mockupCover');

    if (!btn) return;

    // Attach click events to both the main button and the catalog cover mockup
    const triggerDownload = async (e) => {
      e.preventDefault();
      if (btn.disabled) return;

      btn.disabled = true;
      const originalText = textEl.textContent;
      textEl.textContent = 'Compiling PDF...';
      if (status) {
        status.textContent = 'Building pages...';
        status.hidden = false;
      }

      try {
        await generateCatalogPDF();
        if (status) {
          status.textContent = 'Catalog downloaded!';
          setTimeout(() => {
            status.hidden = true;
          }, 3000);
        }
      } catch (err) {
        console.error('PDF Generation Error:', err);
        if (status) {
          status.textContent = 'Error compiling catalog. Try again.';
        }
      } finally {
        btn.disabled = false;
        textEl.textContent = originalText;
      }
    };

    btn.addEventListener('click', triggerDownload);
    if (mockup) {
      mockup.addEventListener('click', triggerDownload);
    }
  });

  async function generateCatalogPDF() {
    const { jsPDF } = window.jspdf;
    
    // Create new document (A4, portrait, millimeters)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageW = 210;
    const pageH = 297;

    // Helper functions for layouts
    function drawPageHeader(title) {
      // Top Navy Strip
      doc.setFillColor(15, 23, 42); // #0f172a
      doc.rect(0, 0, pageW, 20, 'F');

      // Cyan Accent Line
      doc.setFillColor(6, 182, 212); // #06b6d4
      doc.rect(0, 20, pageW, 1.5, 'F');

      // Title Text
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('KRISHNA INDUSTRIES - TECHNICAL CATALOG', 15, 13);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(200, 220, 255);
      doc.text(title.toUpperCase(), pageW - 15, 13, { align: 'right' });
    }

    function drawPageFooter(pageNum) {
      // Bottom Line
      doc.setDrawColor(226, 232, 240); // #e2e8f0
      doc.setLineWidth(0.5);
      doc.line(15, pageH - 15, pageW - 15, pageH - 15);

      // Footer Text
      doc.setTextColor(100, 116, 139); // #64748b
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('Krishna Industries Ballabgarh - Engineered for Precision', 15, pageH - 10);
      doc.text(`Page ${pageNum} of 4`, pageW - 15, pageH - 10, { align: 'right' });
    }

    // ==========================================
    // PAGE 1: COVER PAGE
    // ==========================================
    // Full dark navy background
    doc.setFillColor(15, 23, 42); // #0f172a
    doc.rect(0, 0, pageW, pageH, 'F');

    // Royal Blue large background circle glow
    doc.setFillColor(0, 81, 213, 0.4); // Brand blue opacity
    doc.setGState(new doc.GState({ opacity: 0.15 }));
    doc.circle(pageW, pageH / 2, 80, 'F');
    doc.setGState(new doc.GState({ opacity: 1.0 }));

    // Left Cyan border accent bar
    doc.setFillColor(6, 182, 212); // #06b6d4
    doc.rect(0, 0, 8, pageH, 'F');

    // Logo / Brand Block
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text('KRISHNA', 25, 65);
    doc.setFontSize(20);
    doc.text('INDUSTRIES', 25, 75);

    // Divider Line
    doc.setDrawColor(6, 182, 212);
    doc.setLineWidth(1.5);
    doc.line(25, 83, 100, 83);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 182, 212);
    doc.text('ENGINEERED FOR TECHNICAL EXCELLENCE', 25, 92);

    // Main Brochure Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('TECHNICAL PRODUCT', 25, 140);
    doc.text('SPECIFICATION CATALOG', 25, 152);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('Detailed technical descriptions, performance curve matrices,', 25, 165);
    doc.text('and physical sizing charts for pumping units & control panel systems.', 25, 171);

    // Categories List
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('PRODUCT PORTFOLIO:', 25, 205);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(200, 220, 255);
    doc.text('• Self-Priming Monoblock Pumps (Star / Big Flow Series)', 30, 213);
    doc.text('• High-Pressure Shallow Well Pumps', 30, 220);
    doc.text('• 4" (100 mm) Submersible Pump Sets', 30, 227);
    doc.text('• VACTOS Smart Control Panels', 30, 234);

    // Certification box bottom
    doc.setFillColor(30, 41, 59); // slate-800
    doc.rect(25, 252, 160, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('QUALITY STANDARDS:', 32, 263);
    doc.setFont('helvetica', 'normal');
    doc.text('ISO 9001:2015 CERTIFIED | CE COMPLIANT | BEE 5-STAR RATING', 72, 263);


    // ==========================================
    // PAGE 2: MONOBLOCK & SHALLOW WELL
    // ==========================================
    doc.addPage();
    drawPageHeader('Monoblock & Shallow Well');

    // Title text
    doc.setTextColor(15, 23, 42); // navy
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('1. Self-Priming Monoblock & Shallow Well Pumps', 15, 33);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Designed for domestic water distribution, residential plumbing, and light-scale irrigation loops.', 15, 39);

    // Primary Spec Table
    doc.autoTable({
      startY: 44,
      head: [['Model Series', 'Power (HP/kW)', 'Current (A)', 'Voltage (V)', 'Speed (RPM)', 'Pipe Size (mm)']],
      body: [
        ['Star 0.5HP', '0.5 HP / 0.37 kW', '3.0 A', '230 V, 50 Hz', '2800 RPM', '25 x 25 mm'],
        ['Big Flow 1.0HP', '1.0 HP / 0.75 kW', '5.0 A', '230 V, 50 Hz', '2800 RPM', '25 x 25 mm'],
        ['Shallow Well 1.0HP', '1.0 HP / 0.75 kW', '5.0 A', '230 V, 50 Hz', '2800 RPM', '25 x 25 mm'],
        ['Shallow Well 1.5HP', '1.5 HP / 1.10 kW', '5.0 A', '230 V, 50 Hz', '2800 RPM', '25 x 25 mm']
      ],
      theme: 'striped',
      headStyles: { fillColor: [0, 81, 213], fontStyle: 'bold' },
      styles: { fontSize: 8.5, cellPadding: 2.5 },
      margin: { left: 15, right: 15 }
    });

    // Performance Curve subtitle
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Hydraulic Performance Curve Matrices (Discharge Rate in Liters Per Minute)', 15, doc.lastAutoTable.finalY + 10);

    // Performance curves table
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 14,
      head: [['Model / Head (m)', '6m', '12m', '18m', '24m', '30m', '36m', '42m', '48m', '58m']],
      body: [
        ['Star 0.5HP', '28 LPM', '19 LPM', '12 LPM', '4 LPM', '—', '—', '—', '—', '—'],
        ['Big Flow 1.0HP', '66 LPM', '60 LPM', '52 LPM', '44 LPM', '32 LPM', '26 LPM', '24 LPM', '10 LPM', '—'],
        ['Shallow Well 1.0HP', '62 LPM', '56 LPM', '48 LPM', '30 LPM', '5 LPM', '—', '—', '—', '—'],
        ['Shallow Well 1.5HP', '72 LPM', '62 LPM', '54 LPM', '48 LPM', '36 LPM', '30 LPM', '10 LPM', '—', '—']
      ],
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold' },
      styles: { fontSize: 7.8, cellPadding: 2.2, halign: 'center' },
      columnStyles: { 0: { halign: 'left', fontStyle: 'bold' } },
      margin: { left: 15, right: 15 }
    });

    // Material spec card
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(15, doc.lastAutoTable.finalY + 10, 180, 28, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.rect(15, doc.lastAutoTable.finalY + 10, 180, 28);

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('MATERIAL CONSTRUCTIONS & STANDARDS:', 20, doc.lastAutoTable.finalY + 16);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(71, 85, 105);
    doc.text('• Impeller: Hardened extruded brass alloy ensuring zero cavitation wear.', 20, doc.lastAutoTable.finalY + 22);
    doc.text('• Motor Body: Heavy-grade aluminum extrusion housing with cooling fins.', 20, doc.lastAutoTable.finalY + 27);
    doc.text('• Shaft: Precision grounded carbon steel (SS-410 shaft sleeve optionally provided).', 20, doc.lastAutoTable.finalY + 32);

    drawPageFooter(2);


    // ==========================================
    // PAGE 3: VACTOS CONTROL PANELS
    // ==========================================
    doc.addPage();
    drawPageHeader('VACTOS Control Panels');

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('2. VACTOS Submersible Pump Control Panels', 15, 33);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Engineered with dual-pole protection relays and premium heavy-duty capacitors for smooth motor starts.', 15, 39);

    // Panels Spec Table
    doc.autoTable({
      startY: 44,
      head: [['Model Rating', 'Recommended Pump', 'Capacitor Spec', 'MCB Protection', 'Relay Type', 'Housing Size']],
      body: [
        ['VACTOS 1.0 HP', '1.0 HP Submersible', '36 MFD starting', '16 Amp L/T Brand', '2 Pole AC contactor', 'Standard Compact'],
        ['VACTOS 1.5 HP', '1.5 HP Submersible', '50 MFD starting', '16 Amp L/T Brand', '2 Pole AC contactor', 'Standard Compact'],
        ['VACTOS 2.0 HP', '2.0 HP Submersible', '72 MFD starting', '32 Amp L/T Brand', '4 Pole heavy contactor', 'Medium Industrial'],
        ['VACTOS 3.0 HP', '3.0 HP Submersible', '72 MFD starting', '32 Amp L/T Brand', '4 Pole heavy contactor', 'Medium Industrial']
      ],
      theme: 'striped',
      headStyles: { fillColor: [0, 81, 213], fontStyle: 'bold' },
      styles: { fontSize: 8.5, cellPadding: 3 },
      margin: { left: 15, right: 15 }
    });

    // Technical protections outline
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Advanced Protection Features & Engineering Specs', 15, doc.lastAutoTable.finalY + 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(71, 85, 105);

    const leftColX = 15;
    const rightColX = 110;
    let textY = doc.lastAutoTable.finalY + 19;

    doc.setFont('helvetica', 'bold');
    doc.text('Overload Protection Relay:', leftColX, textY);
    doc.setFont('helvetica', 'normal');
    doc.text('Protects submersible stator windings from burning out during mechanical lock-ups or silt accumulation.', leftColX, textY + 5, { maxWidth: 85 });

    doc.setFont('helvetica', 'bold');
    doc.text('MCB Short-Circuit Isolation:', rightColX, textY);
    doc.setFont('helvetica', 'normal');
    doc.text('Certified L/T breakers isolate the circuitry within milliseconds of current over-draws.', rightColX, textY + 5, { maxWidth: 85 });

    textY += 16;
    doc.setFont('helvetica', 'bold');
    doc.text('Heavy Duty Run Capacitors:', leftColX, textY);
    doc.setFont('helvetica', 'normal');
    doc.text('Specifically tested at 440V ratings to handle line voltage drops without losing capacitance.', leftColX, textY + 5, { maxWidth: 85 });

    doc.setFont('helvetica', 'bold');
    doc.text('LED Metering Indicators:', rightColX, textY);
    doc.setFont('helvetica', 'normal');
    doc.text('Features dedicated analog/digital readouts for active Voltage and Amp drawing levels.', rightColX, textY + 5, { maxWidth: 85 });

    // Schema Box
    doc.setFillColor(241, 245, 249); // slate-100
    doc.rect(15, textY + 16, 180, 24, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('CABLING AND INSTALLATION LAYOUT DIRECTIVE:', 20, textY + 22);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(71, 85, 105);
    doc.text('• Connection Ports: 1-2 (Input Mains: Live, Neutral) | 3-4-5 (Output Motor: Red, Yellow, Blue).', 20, textY + 28);
    doc.text('• Cable Gauge: Use 2.5 mm³ flat copper sub-cables for 1-2 HP, and 4.0 mm³ flat sub-cables for 3.0 HP loops.', 20, textY + 33);

    drawPageFooter(3);


    // ==========================================
    // PAGE 4: SUBMERSIBLE & BACK COVER
    // ==========================================
    doc.addPage();
    drawPageHeader('Submersible Sets & Network');

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('3. 4" (100mm) High-Efficiency Submersible Pump Sets', 15, 33);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Precision built multi-stage submersible pump sets configured for high head lift borewell pumping.', 15, 39);

    // Submersible spec table
    doc.autoTable({
      startY: 44,
      head: [['Model No.', 'HP Rating', 'Stages', 'Max Current', 'Nominal RPM', 'Outlet size', 'Head Range (m)']],
      body: [
        ['Pump Set K7-KI712', '3.0 HP', '12 Stages', '12.4 A', '2800 RPM', '50 mm', '40m - 120m']
      ],
      theme: 'striped',
      headStyles: { fillColor: [0, 81, 213], fontStyle: 'bold' },
      styles: { fontSize: 8.5, cellPadding: 3.5 },
      margin: { left: 15, right: 15 }
    });

    // Contact directory layout
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Krishna Industries Corporate Directory & Distribution', 15, doc.lastAutoTable.finalY + 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text('Connect with our offices for direct dealership quotes, spare parts sourcing, and installation warranties.', 15, doc.lastAutoTable.finalY + 17);

    // Grid of office locations
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 22,
      head: [['Office Tier', 'Location / Contact Address', 'Email & Hotline Support']],
      body: [
        [
          'Global Headquarters',
          'Plot No. 230, Rajiv Colony, Sector 56, Samaypur Road, Near Gujjar Chowk, Ballabgarh, Faridabad, Haryana, India',
          'sales@krishnapumps.com\n+91 9999214313'
        ],
        [
          'Corporate Office',
          'Ahmedabad, Gujarat, India',
          'gujarat@krishnapumps.com'
        ],
        [
          'Distributor Hub (UP)',
          '1. Maldipur Mod, Ballia, Uttar Pradesh, India',
          'up.east@krishnapumps.com'
        ],
        [
          'Distributor Hub (Bihar)',
          '2. Golambar, Buxar–Patna Road, Buxar, Bihar, India',
          'bihar@krishnapumps.com'
        ]
      ],
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold' },
      styles: { fontSize: 8.2, cellPadding: 3, valign: 'middle' },
      margin: { left: 15, right: 15 }
    });

    // Big Thank You / Brand Sign off box
    doc.setFillColor(15, 23, 42); // Navy
    doc.rect(15, doc.lastAutoTable.finalY + 10, 180, 24, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('KRISHNA INDUSTRIES - ENGINEERING TRUST SINCE 1988', 25, doc.lastAutoTable.finalY + 19);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(6, 182, 212);
    doc.text('For online catalog updates and dynamic inquiries, visit www.krishnapumps.com', 25, doc.lastAutoTable.finalY + 26);

    drawPageFooter(4);

    // Save PDF
    doc.save('Krishna_Industries_Product_Catalog.pdf');
  }
})();
