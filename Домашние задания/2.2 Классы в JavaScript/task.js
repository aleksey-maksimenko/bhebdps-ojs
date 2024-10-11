class PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this._state = 100;
		this.type = null;
	}

	fix() {
		let newState = this._state * 1.5;
		this.state = newState;
	}

	get state() {
		return this._state;
	}

	set state(newState) {
		if (newState < 0) {
			this._state = 0;
		} else if (newState > 100) {
			this._state = 100;
		} else {
			this._state = newState;
		}
	}
}

class Magazine extends PrintEditionItem {
	constructor(title, releaseDate, pages) {
		super(title, releaseDate, pages);
		this.type = 'magazine';
	}
}

class Book extends PrintEditionItem {
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.author = author;
		this.type = 'book';
	}
}

class NovelBook extends Book {
	constructor(name, releaseDate, pagesCount, author) {
		super(name, releaseDate, pagesCount, author);
		this.type = 'novel';
	}
}

class FantasticBook extends Book {
	constructor(name, releaseDate, pagesCount, author) {
		super(name, releaseDate, pagesCount, author);
		this.type = 'fantastic';
	}
}

class DetectiveBook extends Book {
	constructor(name, releaseDate, pagesCount, author) {
		super(name, releaseDate, pagesCount, author);
		this.type = 'detective';
	}
}

class Library {
	constructor(name) {
		this.name = name;
		this.books = [];
	}

	addBook(book) {
		if (book.state > 30) {
			this.books.push(book);
		}
	}

	findBookBy(type, value) {
		for (let i = 0; i < this.books.length; i++) {
			if (this.books[i][type] === value) { //если заданное поле совпадает по значению
				return this.books[i];
			}
		}
		return null;
	}

	giveBookByName(bookName) {
		for (let i = 0; i < this.books.length; i++) {
			if (this.books[i].name === bookName) { //если нашли по названнию
				const bookToGive = this.books[i];
				this.books.splice(i, 1); // удаляем книгу
				return bookToGive;
			}
		}
		return null; // в противом случае возвращаем null
	}
}

/*  
//пример из постановки задания
const library = new Library("Библиотека имени Ленина");

library.addBook(
 new DetectiveBook(
   "Артур Конан Дойл",
   "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
   2019,
   1008
 )
);
library.addBook(
 new FantasticBook(
   "Аркадий и Борис Стругацкие",
   "Пикник на обочине",
   1972,
   168
 )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library.findBookBy("name", "Властелин колец")); //null
console.log(library.findBookBy("releaseDate", 1924).name); //"Мурзилка"

console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4
library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3
*/

/*
//реализация сценария по заданнию
const myLibrary = new Library("Библиотека им. Ленина");

myLibrary.addBook(
 new DetectiveBook(
   "Артур Конан Дойл",
   "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
   2019,
   1008
 )
);

myLibrary.addBook(
 new FantasticBook(
   "Аркадий и Борис Стругацкие",
   "Пикник на обочине",
   1972,
   168
 )
);
myLibrary.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1919, 138));
myLibrary.addBook(new Magazine("Мурзилка", 1924, 60));
myLibrary.addBook(new Magazine("Юный натуралист", 1984, 60));

const foundBook = myLibrary.findBookBy("releaseDate", 1919);

if (foundBook) {
  console.log("Найдена книга 1919 года: " + foundBook.author + " автор: " + foundBook.author);
} else {
  console.log("Книга 1919 года не найдена, создаем новую");
  
  const newBook = new Book("Фрэнк Герберт", "Дюна", 1919, 100);
  myLibrary.addBook(newBook);
}

// выдаем книгу
const bookToGive = myLibrary.giveBookByName("Пикник на обочине");
if (bookToGive) {
  console.log("Выдана книга: " + bookToGive.name);
  // повреждаем выданную книгу
  bookToGive.state = 20; 
  console.log("Книга повреждена. Текущее состояние: " + bookToGive.state);
  
  // восстанавливаем
  bookToGive.fix();
  console.log("Книга восстановлена. Текущее состояние: " + bookToGive.state);
  
  myLibrary.addBook(bookToGive);
  console.log("Книга " + bookToGive.name + " была добавлена обратно в библиотеку");
} else {
  console.log("Книга не найдена");
}

console.log("Текущие книги в библиотеке:");
console.log(myLibrary.books);
*/