import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-do-your-design',
  templateUrl: './do-your-design.component.html',
  styleUrls: ['./do-your-design.component.css']
})
export class DoYourDesignComponent implements OnInit {
  tools = [
    {
      img: "../../../../assets/images/nubian/pattern.svg",
      name: "Patterns"
    },
    {
      img: "../../../../assets/images/nubian/pencil.svg",

      name: "Pencil"
    },
    {
      img: "../../../../assets/images/nubian/elemnts.svg",

      name: "Elements"
    },
    {
      img: "../../../../assets/images/nubian/text.svg",

      name: "Text "
    },
    {
      img: "../../../../assets/images/nubian/letters.svg",

      name: "nubian letters "
    },
    {
      img: "../../../../assets/images/nubian/upload.svg",

      name: 'Upload'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
