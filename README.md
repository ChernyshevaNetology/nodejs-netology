# MongoDB Examples

Примеры для запросов в mongoDb.

## Вставка более чем одного элемента в коллекцию

```javascript
db.books.insertMany([
    {
        title: "The old man and the sea",
        description: "Book description",
        authors: "Jack London"
    },
    {
        title: "Crime and Punishment",
        description: "Crime and Punishment Russian classics",
        authors: "Fedor Dostoevsky"
    }
]);

## запрос для редактирования полей: description и authors коллекции books по _id записи.

```javascript
db.books.updateOne(
    { _id: ObjectId("your-id-here") }, 
    { $set: { description: 'new Description', authors: 'Пелевин' } }
);

## Поиск книги по полю (в примере title)

db.books.find({ title: "Crime and Punishment" });