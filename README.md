# Base de Datos – Blogui Gamer

Este documento describe la estructura completa de la base de datos utilizada en el proyecto **Blogui Gamer**, detallando las colecciones, los campos, las relaciones entre entidades y el propósito de cada modelo.

La base de datos utiliza **MongoDB**, un sistema NoSQL orientado a documentos, con **Mongoose** como ODM para la definición de modelos y validaciones.

---

# Colecciones Principales

La base está compuesta por tres colecciones centrales:

- **Users**
- **Posts**
- **Comments**

Estas entidades se relacionan entre sí mediante identificadores únicos (`ObjectId`), formando una estructura flexible y escalable ideal para un sistema de blog.

---

# Modelo: User

Representa a cada persona registrada en la plataforma.

## Campos:
- **username**: string — nombre público del usuario  
- **email**: string — único, requerido  
- **password**: string — contraseña encriptada con bcrypt  
- **createdAt / updatedAt**: fechas automáticas generadas por Mongoose  

## Ejemplo de documento:
{
  "_id": "65f1cc12e5c9ab12cd998b31",
  "username": "eze",
  "email": "eze@example.com",
  "password": "hashed_password",
  "createdAt": "2025-03-01T18:20:00Z"
}

## Relaciones:
- Un usuario puede crear **muchos Posts**
- Un usuario puede realizar **muchos Comments**

---

# Modelo: Post

Representa una publicación dentro del blog.

## Campos:
- **title**: string — obligatorio  
- **content**: string — texto principal del post  
- **createdBy**: ObjectId (User) — referencia al autor  
- **createdAt**: date  
- **updatedAt**: date  

## Ejemplo de documento:
{
  "_id": "65f1cc87ab90cd11a332baa7",
  "title": "Mi primer post gamer",
  "content": "Este es un post de ejemplo...",
  "createdBy": "65f1cc12e5c9ab12cd998b31",
  "createdAt": "2025-03-02T12:04:00Z"
}

## Relaciones:
- Un post pertenece a **un solo usuario**
- Un post puede tener **muchos comentarios**

---

# Modelo: Comment

Representa un comentario realizado en un post.

## Campos:
- **content**: string — texto del comentario  
- **postId**: ObjectId (Post) — post al que pertenece  
- **createdBy**: ObjectId (User) — autor del comentario  
- **createdAt**: date  

## Ejemplo de documento:
{
  "_id": "65f1cc91b8c13122aa43ed90",
  "content": "Muy buen post!",
  "postId": "65f1cc87ab90cd11a332baa7",
  "createdBy": "65f1cc12e5c9ab12cd998b31",
  "createdAt": "2025-03-02T12:15:30Z"
}

## Relaciones:
- Un comentario pertenece a **un único Post**
- Un comentario pertenece a **un único User**

---

# Diagrama de Relaciones (Lógico)

User (1) ────────── (∞) Post  
User (1) ────────── (∞) Comment  
Post (1) ────────── (∞) Comment  

O visualmente:

- **User**
  - crea → **Post**
  - escribe → **Comment**
- **Post**
  - pertenece a → **User**
  - recibe → **Comment**
- **Comment**
  - pertenece a → **User**
  - pertenece a → **Post**

---

# Sentido del Diseño

Este modelo está pensado para:

- permitir un sistema de blog simple y escalable  
- mantener una relación clara entre autores y contenido  
- simplificar CRUD de posts y comentarios  
- evitar datos duplicados gracias a referencias con ObjectId  
- permitir búsquedas eficientes (posts por usuario, comentarios por post, etc.)

MongoDB resulta ideal para este proyecto debido a:

- su flexibilidad de documentos  
- facilidad para relacionar colecciones con referencias  
- manejo eficiente de datos no estructurados  
- compatibilidad perfecta con Mongoose y Express

---

# Consultas comunes (MongoDB)

## Obtener todos los posts de un usuario:
Post.find({ createdBy: userId })

## Obtener comentarios de un post:
Comment.find({ postId })

## Contar posts de un usuario:
Post.countDocuments({ createdBy: userId })

## Contar comentarios de un usuario:
Comment.countDocuments({ createdBy: userId })

---

# Resumen Final

| Colección | Contiene | Relación |
|----------|----------|----------|
| User | Datos de usuario | 1 → muchos posts, 1 → muchos comentarios |
| Post | Publicaciones | pertenece a 1 usuario, tiene muchos comentarios |
| Comment | Comentarios | pertenece a 1 usuario y 1 post |

---

# Autor

Ezequiel Duarte  
Comisión A-1331  
Aplicaciones Híbridas I  
Profesor: Jonathan Cruz  

---

#  Archivo listo para usar  
Este archivo puede guardarse como:  
DATABASE.md  
o agregarse al README principal según lo requiera la entrega.

