import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";

@Component({
  selector: "app-component",
  templateUrl: "./app.component.html"
})
export class AppComponent {

  @ViewChild('addChatResponse')
  private animateThis: ElementRef;
  constructor(private renderer: Renderer2) {}

  public userInput = "";
  public userInputCount = 0;

  sendToBot() {
    this.appendUserMessage(this.userInput);
    this.appendBotMessage(this.statement1.message);
    this.appendUserMessage("Test message");
    this.appendResponseCard(this.statement6.message, this.statement6.responseCard);
  }

  appendUserMessage(userMessage) {
    const userli = this.renderer.createElement("li");
    const userp = this.renderer.createElement("p");
    const usertext = this.renderer.createText(`User: ${userMessage}`);
    this.renderer.addClass(userli, "user-li");
    this.renderer.addClass(userp, "user-p");
    this.renderer.appendChild(userp, usertext);
    this.renderer.appendChild(userli, userp);
    this.renderer.appendChild(this.animateThis.nativeElement, userli);
    this.userInput = "";
  }

  appendBotMessage(botMessage) {
    const botli = this.renderer.createElement("li");
    const botp = this.renderer.createElement("p");
    const bottext = this.renderer.createText(`Bot: ${botMessage}`);
    this.renderer.addClass(botli, "bot-li");
    this.renderer.addClass(botp, "bot-p");
    this.renderer.appendChild(botp, bottext);
    this.renderer.appendChild(botli, botp);
    this.renderer.appendChild(this.animateThis.nativeElement, botli);
  }

  appendResponseCard(botMessage, responseCard) {
    const botli = this.renderer.createElement("li");
    const botp = this.renderer.createElement("p");
    this.renderer.addClass(botli, "bot-li");
    this.renderer.addClass(botp, "bot-p");
    const bottext = this.renderer.createText(`Bot: ${botMessage}`);
    
    const responseDiv = this.renderer.createElement("div");

    for(let i = 0, len = this.statement6.responseCard.genericAttachments[0].buttons.length; i < len; i++) {
      const buttons = this.statement6.responseCard.genericAttachments[0].buttons[i];
      const button = this.renderer.createElement("button");
      const buttontext = this.renderer.createText(buttons.text);
      this.renderer.setProperty(button, "value", buttons.value);
      this.renderer.addClass(button, "response-card-button");
      this.renderer.appendChild(button, buttontext);
      this.renderer.appendChild(responseDiv, button);
      this.renderer.addClass(responseDiv, "response-card-div");
      this.renderer.listen(button, "click", event => {
        console.log(event.target.value);
      })
    }

    this.renderer.appendChild(botp, bottext);
    this.renderer.appendChild(botli, botp);
    this.renderer.addClass(responseDiv, "response-card-div");
    this.renderer.appendChild(botli, responseDiv);
    this.renderer.appendChild(this.animateThis.nativeElement, botli);
  }

  statement1 = {
    message: "Hey there! Tell me your first name.",
    responseCard: null
  };
  statement6 = {
    message: "Select appoinment slot",
    responseCard: {
      contentType: "application/vnd.amazonaws.card.generic",
      genericAttachments: [
        {
          attachmentLinkUrl: null,
          buttons: [
            { text: "10:00 am", value: "10:00 am" },
            { text: "10:30 am", value: "10:30 am" },
            { text: "11:00 am", value: "11:00 am" },
            { text: "11:30 am", value: "11:30 am" },
            { text: "09:30 am", value: "9:30 am" }
          ],
          imageUrl:
            "https://cdn5.f-cdn.com/contestentries/357874/17076392/56d3f7013ac78_thumb900.jpg",
          subTitle: null,
          title: "Appoinment Scheduler"
        }
      ],
      version: "1"
    }
  };
}
