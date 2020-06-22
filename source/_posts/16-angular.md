---
title: Learning Angular
date: 2020-06-20 16:55:44
tags: ['front-end', 'frameword', 'angular', 'notes', 'javascript']
categories: Notes
cover: 'https://www.freecodecamp.org/news/content/images/2020/04/Copy-of-Copy-of-Travel-Photography.png'
---

> When I was learn typescript, I found that Angualr is a Typescript-based framework. Learn two things at one time, isnt that good? I preferred to use code format for notes because I think it's more straight forward. However, some difficult topics I will explain more in the comments

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

## Template Reference Variables

Assume we have an input field and we want to get the user's input after click the button

```html
<div className="input-reference-demo">
  <input #userName type="text" placeholder="what is your name?" />
  <button (click)="handleSubmit(userName.value)">Submit</button>
</div>
```

```ts
export class AppComponent {
  constructor() {}

  handleSubmit(name) {
    console.log(name)
  }
}
```

## Two-way Binding

In the above example, we have to click to button in order to get the value of the input. What if we want to the variable in Class component are updating with the interpolation in HTML view at same time? We could use Angular ngModal Forms.

**app.modules.ts**

```typescript
import { FormsModule } from '@angular/forms'

@NgModule({
  //......
  imports: [
    //......
    FormsModule
  ],
  //......
})
```

```HTML
<div className="two-way-binding-demo">
    <input [(ngModel)]="userName" type="text" placeholder="user name" />
    <p>{{ userName }}</p>
</div>
```

```Typescript
export class AppComponent {
  public userName = ""
}
```

# Directive

## ngIf Directive

### ngIf with only if statements

```Typescript
export class AppComponent {
  public isDisplay = false
}
```

```HTML
<div class="ngIf-directive-demo">
  <h2 *ngIf="isDisplay">You Can see me now!</h2>
</div>
```

### ngIf with else statement

```Typescript
export class AppComponent {
  public isLoggedIn = false
}
```

```HTML
<div class="ngIf-else-demo">
  <h2 *ngIf="isLoggedIn; else notLoginBlock">Hello User!</h2>

  <ng-template #notLoginBlock>
      <h2>Please Log In</h2>
  </ng-template>
</div>
```

### ngIf with then and else statement

```Typescript
export class AppComponent {
  public isLoggedIn = false
}
```

```HTML
<p *ngIf="isLoggedIn; then loggedInBlock; else publicBlock" class="ng-if-then-else-demo">
</p>

<ng-template #loggedInBlock>
  <h2>Welcome back User!</h2>
</ng-template>

<ng-template #publicBlock>
  <h2>Please login</h2>
</ng-template>
```

## ngSwitch Directive

For mulitiple conditional statements

```Typescript
export class AppComponent {
  public category="Anime"
}
```

```HTML
<div [ngSwitch]="category">
  <p *ngSwitchCase="'anime'">Anime</p>
  <p *ngSwitchCase="'music'">Music</p>
  <p *ngSwitchCase="'manga'">Manga</p>
  <p *ngSwitchCase="'game'">Game</p>
  <p *ngSwitchDefault>N/A</p>
</div>
```

## ngFor Directive

For looping and rendering

```Typescript
export class AppComponent {
  public animes = ['Fate Stay Night', 'Clannad', 'Haikyuu', 'Attack on Titan'];
}

```

```HTML
<ul>
  <li
    *ngFor="
      let item of animes;
      index as i;
      first as f;
      last as l;
      even as e;
      odd as o
    "
  >
    Index: {{ i }} Elements: {{ item }} isFirst: {{ f }} isLast: {{ l }} isEven:
    {{ e }} isOdd: {{ o }}
  </li>
</ul>

```

# Component Interaction: @Input() @Output()

## @Input()

Passing props from parent to child components. The code below pass the `title` props from `AppComponent` to `CardComponent`

**app.component.ts**

```Typescript
export class AppComponent {
  //The props we want to pass to card components
  public title = 'Attack on Titan'
}
```

**app.components.html**

```HTML
<h2>All my cards</h2>
<!-- Inside [] is the name we want to call in our child component -->
<app-card [title]="title"></app-card>
```

**card.components.ts**

```Typescript
import { Component, OnInit, Input } from '@angular/core';

// ......

export class CardComponent implements OnInit {
    //We use @Input() decorator to declare the passed props
    @Input() public title: string;
    // ......
}
```

**card.components.html**

```HTML
<!-- Then we can just use as normal interpolation -->
<p>{{title}}</p>
```

## @Output()

Passing props from child component to parent component, we need to use event and @Output() decorator

**card.component.ts**

```Typescript
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// ......

export class TestComponent implements OnInit {
  @Output() public childEvent = new EventEmitter();

  // ......

  handleEvent() {
    //the message we want to pass
    this.childEvent.emit('Fate Stay Night');
  }
}

```

**card.component.html**

```HTML
<button (click)="handleEvent()">Pass Back</button>
```

**app.component.ts**

```Typescript
export class AppComponent {
  public title = ""
}
```

**app.component.html**

```HTML
<app-card (childEvent)="title = $event"></app-card>

{{ title }}

```

# Pipes

Angular pipes allows us to write data transformation that we declare in HTML. Some common pipes listed below

```Typescript
export class AppComponent {
  public name = 'Attack on Titan';
  public date = new Date();
  public anime = {
    name: 'Fate stay night',
    category: 'action',
  };
}
```

```HTML
<!-- attack on titan -->
<p>{{ name | lowercase }}</p>

<!-- ATTACK ON TITAN -->
<p>{{ name | uppercase }}</p>

<!-- Attack On Titan -->
<p>{{ name | titlecase }}</p>

<!-- At -->
<p>{{ name | slice: 0:2 }}</p>

<!-- { "name": "Fate stay night", "category": "action" } -->
<p>{{ anime | json }}</p>

<!-- 25% -->
<p>{{ 0.25 | percent }}</p>

<!-- $0.25 -->
<p>{{ 0.25 | currency }}</p>

<!-- £0.25 -->
<p>{{ 0.25 | currency: "GBP" }}</p>

<!-- Sun Jun 21 2020 22:52:43 GMT-0700 (北美太平洋夏令时间) -->
<p>{{ date }}</p>

<!-- 6/21/20, 10:52 PM -->
<p>{{ date | date: "short" }}</p>

<!-- 6/21/20 -->
<p>{{ date | date: "shortDate" }}</p>

<!-- 10:52 PM -->
<p>{{ date | date: "shortTime" }}</p>
```

# Services

Components should used for displaying data as views, and we need `services` to fetch and store datas, in which all the componets could communicate with the data we retrieved. The following are the three steps to use the service

## Using Services to store data

1. Define a service that store the data we want
2. Register the service with injector in our moudle
3. Declare as dependency in `ngOnInit` in our sub components

### Define a new service

```bash
ng generate service servicename
```

```Typescript
import {Injectable} from '@angular/core'

@Injectable()

export class AnimeService {
  constructor() {
  }

  getAnime() {
    return [
      {"id": "1", "name": "Fate Stay Night", "rank": 9.4},
      {"id": "2", "name": "Haikyuu", "rank": 19.0},
      {"id": "3", "name": "Clannad", "rank": 9.5},
      {"id": "4", "name": "Attack on Titan", "rank": 8.5},
      {"id": "5", "name": "Tamako Love Story", "rank": 8.8},
    ]
  }
}
```

### Register service with Injector

In our app module

```Typescript
import {AnimeService} from './anime.service';
// .......

@NgModule({
  // ......
  providers: [AnimeService]
})
```

### Declare as dependency

In our anime list components, we could then use the service that we register

```Typescript
export class AnimeListComponent implements OnInit {
  public anime = []
  constructor(private _animeService: AnimeService) {}
  ngOnInit() {
    this.anime = this._animeService.getAnime()
  }
}

```

```HTML
<ul>
  <li *ngFor="let item of anime">
    {{ item.id }} {{ item.name }} {{ item.rank }}
  </li>
</ul>

```

```markdown
- 1 Fate Stay Night 9.4
- 2 Haikyuu 19
- 3 Clannad 9.5
- 4 Attack on Titan 8.5
- 5 Tamako Love Story 8.8
```

## Using service and Http modules to fetch data

### 1. Import Http module

**app.module.ts**

```Typescript
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
```

### 2. Receive the response

**anime.service.ts**

```Typescript
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';

export class AnimeService {
  private url: string = 'https://v1.hitokoto.cn/?c=a&c=b&c=c&c=d&c=k'

  constructor(private http: HttpClient) {}

  getAnime(): Observable<[]> {
    return this.http.get<[]>(this.url);
  }
}
```

### 3. Subscribe to the observable from AnimeList component

```Typescript
import { AnimeService } from '../anime.service';

export class AnimeListComponent implements OnInit {
  public anime = []
  constructor(private animeService: AnimeService) {}
  ngOnInit() {
    this.animeService.getAnime()
      .subscribe(data => this.anime = data)
  }
}
```
