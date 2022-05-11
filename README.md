# Employee API (NodeJS + MSSQL)

This is a sample API for managing employee using [NodeJS](https://nodejs.org/en/) and [SQL SERVER](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

## Features

- Create
- Get
- Update
- Delete

## API Reference

#### Employee

```http
  GET /api/employee
```

| Parameter | Type    | Description |
| :-------- | :------ | :---------- |
| `?id=`    | `query` | Optional    |

```http
  GET /api/employee/:id
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `string` | **Required** |

```http
  POST /api/employee/create
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `name`    | `string` | **Required**                     |
| `gender`  | `string` | **Required**. Must be 'F' or 'M' |
| `address` | `string` | **Required**                     |
| `salary`  | `number` | **Required**                     |

```http
  PUT /api/employee/edit/:id
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `string` | **Required** |
| `name`    | `number` | Optional     |
| `address` | `string` | Optional     |
| `salary`  | `number` | Optional     |

```http
  DELETE /api/employee/delete/:id
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `id`      | `string` | **Required** |

## Environment Variables

To run this project, you will need to follow this intruction

- Create .env file in root folder and add these Variables

  `DB_USER` - Username to login to MSSQL

  `DB_PASSWORD` - Password to login to MSSQL

  `DB_SERVER` - Server to connect to

  `DB_DATABASE` - Choose database you want to use
