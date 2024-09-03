declare module 'html2pdf.js' {
  type Html2PdfOptions = {
    margin?: number | [number, number, number, number]
    filename?: string
    image?: { type: string; quality: number }
    html2canvas?: { scale: number; logging: boolean; dpi: number; letterRendering: boolean }
    jsPDF?: { unit: string; format: string | number[]; orientation: string }
  }

  type Html2Pdf = {
    from(element: HTMLElement | string): Html2Pdf
    set(options: Html2PdfOptions): Html2Pdf
    toPdf(): Html2Pdf
    get(type: 'pdf'): Promise<jsPDF>
  }

  const html2pdf: () => Html2Pdf
  export = html2pdf
}
