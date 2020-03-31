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

    // li
    const botli = this.renderer.createElement('li');
    this.renderer.addClass(botli, "bot-li");

    // li > div
    const botlidiv = this.renderer.createElement('div');
    this.renderer.addClass(botlidiv, "li-div");
    this.renderer.appendChild(botli, botlidiv);

    // li > div > p
    const botp = this.renderer.createElement('p');
    const botptext = this.renderer.createText(`Bot: ${botMessage}`);
    this.renderer.appendChild(botp, botptext);
    this.renderer.addClass(botp, "bot-p");
    this.renderer.appendChild(botlidiv, botp);

    // li > div > div
    const botcard = this.renderer.createElement('div');
    this.renderer.addClass(botcard, "card");
    this.renderer.appendChild(botlidiv, botcard);

    // li > div > div > cardtitle
    const botcardtitle = this.renderer.createElement('div');
    this.renderer.addClass(botcardtitle, "card-title");
    this.renderer.appendChild(botcard, botcardtitle);

    // li > div > div > cardtitle > span
    const cardtitlespan = this.renderer.createElement('span');
    const cardtitlespantext = this.renderer.createText(responseCard.genericAttachments[0].title);
    this.renderer.appendChild(cardtitlespan, cardtitlespantext);
    this.renderer.appendChild(botcardtitle, cardtitlespan);

    // li > div > div > cardtext
    const botcardtext = this.renderer.createElement('div');
    this.renderer.addClass(botcardtext, "card-text");
    this.renderer.appendChild(botcard, botcardtext);

    // li > div > div > cardtext > span
    const cardtextspan = this.renderer.createElement('span');
    const cardtextspantext = this.renderer.createText(responseCard.genericAttachments[0].subTitle);
    this.renderer.appendChild(cardtextspan, cardtextspantext);
    this.renderer.appendChild(botcardtext, cardtextspan);

    // li > div > div > cardmedia
    const cardmedia = this.renderer.createElement('div');
    this.renderer.addClass(cardmedia, "card-media");
    this.renderer.setStyle(cardmedia, "background-image", `url(${responseCard.genericAttachments[0].imageUrl})`);
    this.renderer.setStyle(cardmedia, "background-position", "center center");
    this.renderer.setStyle(cardmedia, "background-size", "contain");
    this.renderer.setStyle(cardmedia, "background-repeat", "no-repeat");
    this.renderer.setStyle(cardmedia, "height", "150px");
    this.renderer.appendChild(botcard, cardmedia);

    // li > div > div > cardaction
    const cardaction = this.renderer.createElement('div');
    this.renderer.addClass(cardaction, 'card-actions');
    this.renderer.appendChild(botcard, cardaction);

    for(let i = 0, len = responseCard.genericAttachments[0].buttons.length; i < len; i++) {
      const buttons = responseCard.genericAttachments[0].buttons[i];
      const button = this.renderer.createElement("button");
      const buttontext = this.renderer.createText(buttons.text);
      this.renderer.setProperty(button, "value", buttons.value);
      this.renderer.addClass(button, "response-card-button");
      this.renderer.appendChild(button, buttontext);
      this.renderer.appendChild(cardaction, button);
      this.renderer.listen(button, "click", event => {
        console.log(event.target.value);
      })
    }

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
          subTitle: "test",
          title: "Appoinment Scheduler"
        }
      ],
      version: "1"
    }
  };
}
