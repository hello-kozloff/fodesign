# ☄ Fodesign
Frontend development

## Установка
1. Установите глобально менеджер пакетов `yarn`
2. Клонируйте репозиторий - `git clone https://github.com/hello-kozloff/fodesign.git`
3. Установите зависимости из папки с проектом - `yarn install`

## Файловая структура
```
fodesign
├── build
├── static
├── src
│   ├── blocks
│   ├── fonts
│   ├── images
│   ├── pages
│   ├── sass
├── gulpfile.babel.js
├── package.json
├── .babelrc.js
└── .gitignore
```

## Инструменты
- Если вы хотите запустить watch, используйте: `yarn start`
- Если вы хотите собрать production версию прокта, используйте: `yarn build`
- Если вы хотите создать новый блок, используйте: `gulp create --block block-name`