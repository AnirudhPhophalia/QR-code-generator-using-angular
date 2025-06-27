import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'qr-code',
  standalone: true,
  templateUrl: './qr-code.html',
  styleUrls: ['./qr-code.css']
})
export class QrCodeComponent implements AfterViewInit, OnChanges {
  @Input() data: string = '';
  @ViewChild('qrCodeCanvas', { static: true }) qrCodeCanvas!: ElementRef;
  private qrCode: any;

  async ngAfterViewInit(): Promise<void> {
    if (typeof window !== 'undefined') {
      const { default: QRCodeStyling } = await import('qr-code-styling');

      this.qrCode = new QRCodeStyling({
      width: 290,
      height: 290,
      data: this.data,
      image: 'cam-shot-icon.png',
      imageOptions: {
        crossOrigin: 'anonymous',
        imageSize: 0.4,
        margin: 10
      },
      qrOptions: {
        typeNumber: 10,
        errorCorrectionLevel: 'M',// 'L', 'M', 'Q', 'H',
      },
      dotsOptions: {
        // color: '#000000',
        color: '#febe37',
        type: 'square' // 'rounded', 'dots', 'classy', 'classy-rounded', 'square', 'extra-rounded'
      },
      cornersSquareOptions: {
        // color: '#000000',
        color: '#febe37',
        type: 'square'// 'rounded', 'square', 'extra-rounded'
      },
      cornersDotOptions: {
        color: '#febe37',
        // color: '#000000',
        type: 'square' // 'dot', 'square'
      },
      backgroundOptions: {
        color: '#ffffff'
      }
      });

      this.qrCode.append(this.qrCodeCanvas.nativeElement);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.qrCode && changes['data']) {
      this.qrCode.update({ data: this.data });
    }
  }

  download(): void {
    if (this.qrCode) {
      this.qrCode.download({ name: 'qr-code', extension: 'png' });
    }
  }
}
