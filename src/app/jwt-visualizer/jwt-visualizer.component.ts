import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jwt-visualizer',
  templateUrl: './jwt-visualizer.component.html',
  styleUrls: ['./jwt-visualizer.component.scss']
})
export class JwtVisualizerComponent implements OnInit {

  exampleJwt = {
    header: {
      alg: 'HS256',
      typ: 'JWT'
    },
    payload: {
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022
    },
    signature: {
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
