---
title: Learning Angular
date: 2020-06-20 16:55:44
tags: ['front-end', 'frameword', 'angular', 'notes', 'javascript']
categories: Notes
cover: 'https://www.freecodecamp.org/news/content/images/2020/04/Copy-of-Copy-of-Travel-Photography.png'
---

After learning react, I thought why not give angular a try and compare some features between these two. At the early learning stage, I always believe that more is better, and later I could just specialize one framework that suits my need

# Setup Angular Project 配置

```markdown
npm install -g @angular/cli <!-- install Angular CLI globally -->

ng new project-name <!-- create an angular template called project-name -->

cd project-name

ng serve <!-- ng serve running application -->
```

# Components 组件

Basically, Angular componet has three parts:

1. Template, also the view of our component, is where we write our HTML code to it;
2. Class, has the methods and functionality of our component,
3. Metadata which contains the information of our components

Below is the basic app component `class` file.

```ts
// import angular necessary libryaries
import { Component } from '@angular/core'

// decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
```

In the decorator, we have `selecotor`, `templateUrl`, and `styleUrls`。

`selectoor` is how can we specify our component in HTML template. For example, we could use `<app-root></app-root>` to display our component.

`templateUrl` will direct our HTML file inside our component folder. We could also use `template` to write inline HTML for shorter codes.

`styleUrls` is point to our css file.

# Interpolation

```ts
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-card',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class CardComponent implements OnInit {
  name: Auotoria
  category: saber

  sayMsg() {
    return 'Excalibur!!!'
  }
}
```

```html
<div>
  <p>
    <!-- return name and category from CardComponent -->
    Card Name:{{ name }} Card Category:{{ category }}
  </p>
  <p>{{ sayMsg() }}</p>
</div>
```

# Data Binding

## Style Binding

We could bind style to HTML element with variable, conditional statements, or objects.

```html
<div class="style-binding-demo">
  <p [style.color]="errorColor">Binding with variable</p>
  <p [style.color]="isError ? 'red' : null">
    Binding with conditional statement
  </p>
  <p [ngStyle]="titleStyle">Biding with object styles</p>
</div>
```

```ts
export class AppComponent {
  public errorColor = 'red'
  public isError = true
  public titleStyle = {
    fontWeight: 'bold',
    color: 'red',
  }
  constructor() {}
}
```

## Event Binding

```html
<div class="event-binding-demo">
  <button (click)="handleClick()">Submit</button>
  <button (click)="welcomeMsg='Hello Yang!'">Display in HTML</button>

  <button (click)="handleMsg()">Conditional Render</button>
  {{welcomeMsg}}
</div>
```

```ts
export class AppComponent {
  public welcomeMsg = ''
  public userName = 'Yang Li'

  constructor() {}

  handleSubmit() {
    alert('Submit success')
  }

  handleMsg() {
    welcomeMsg = `Hello ${userName}!`
  }
}
```
