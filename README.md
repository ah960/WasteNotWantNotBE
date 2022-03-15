# WasteNot: WantNot

An all encompassing app that allows households to plan their meals, track expiry dates of items in their pantry and find local food donation points to donate surplus items.
Households can also track their progress and earn badges based on how effectively they are managing their food.

*Note:  App currently runs best on screen sizes 428 x 926 (i.e. iPhone 12 Pro Max)*

<img src="https://i.ibb.co/YTPxJWZ/Wn-Wn-Logo-Black.png" alt="logo" width="200" height="200"/>

#### Quick Start

Begin with downloading all of the dependencies:

```bash
  npm i
```

- Sign up to MongoDB and obtain a URI.
- Add this URI to your .env file
- Change data_sources/mongodb-atlas/config.json to reflect your clusterName.

To run this project, run the command:

```bash
  npm run dev
```

## API Reference

#### Edamam API

#### Get access to the Edamam Recipe Search API


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `api_id`. | `string` | **Required** Your API id   |

Add these credentials to a .env file and link to them in the edamam.js file under the routes folder. 


## Authors


[![github](https://img.shields.io/badge/Sareena_Naser-FF6600?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Syn891) &nbsp; [![github](https://img.shields.io/badge/Erdogan_Elma-FDA96F?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Erdogan90) &nbsp; [![github](https://img.shields.io/badge/Adam_Hooper-FFEADB?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ah960) &nbsp; 

[![github](https://img.shields.io/badge/Amanda_Richards-7BE1AE?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AmandaRichards) &nbsp; [![github](https://img.shields.io/badge/Gariel_Sterpone_Magni-00CD66?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gabrielsterponemagni) &nbsp; [![github](https://img.shields.io/badge/Thomas_Dichmont-009100?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tom-dichmont)


## Documentation

[Research and Planning Documentation](https://github.com/Syn891/wnwn-frontend/tree/main)

[Figma Board](https://www.figma.com/file/YUvxAuqMVHYhvpNJqDoCLR/Waste-Not%2C-Want-Not?node-id=0%3A1)

[Frontend Repository](https://github.com/Syn891/wastenot-wantnot-fe)

