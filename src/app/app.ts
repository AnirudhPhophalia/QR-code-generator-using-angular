import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QrCodeComponent } from './qr-code/qr-code';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, QrCodeComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  qrValue: string = 'https://yourapppppppppppppppppppp.com';
}
