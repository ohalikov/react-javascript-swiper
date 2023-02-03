import React from "react";
import { Button } from "../Button/";

import "./rework-button.css";

const preProcessedText = [
  "у меня были попытки культивировать кокаиновый куст, не могу сказать, что это получилось, но теперь я знаю, на что обращать внимание при следующем культивировании",
  "чтобы вырастить коноплю, надо купить хорошую почву на торфяной или гумусовой основе, желательно, не очень щелочные, но чтоб было много азота, фосфора и кальция",
  "чтобы у тебя хороший урожай конопли был,  надо обязательно выдерживать долгий световой режим",
  "за кактусами вообще уход сложный, особенно если они мескалин содержат, там очень важно соблюдать правильный полив, а то растение не будет давать такой забойный эффект",
];

const requestText = `Вариант текста другими словами 1: "у меня были попытки культивировать кокаиновый куст, не могу сказать, что это получилось, но теперь я знаю, на что обращать внимание при следующем культивировании"

Вариант текста другими словами 2: "чтобы вырастить коноплю, надо купить хорошую почву на торфяной или гумусовой основе, желательно, не очень щелочные, но чтоб было много азота, фосфора и кальция"

Вариант текста другими словами 3: "чтобы у тебя хороший урожай конопли был,  надо обязательно выдерживать долгий световой режим"

Вариант текста другими словами 4: "за кактусами вообще уход сложный, особенно если они мескалин содержат, там очень важно соблюдать правильный полив, а то растение не будет давать такой забойный эффект"`;
const getEditedText = (text) => {
  const editedString = text
    .split("\n\n")
    .filter((x) => !!x)[0]
    .replace(new RegExp(/Вариант текста другими словами 5:/), "");
  return editedString;
};

const getReadyText = (textForProcessed) => {
  let readyString = textForProcessed.reduce((prev, current, index) => {
    return `${prev}\n\nВариант текста другими словами ${
      index + 1
    }: "${current}"`;
  }, "");

  return readyString;
};

export const ReworkButton = ({ children }) => {
  const getRandomStrings = () => {
    const prefix = "Вариант текста другими словами";
    const temp = 0.9;
    const length = 50;

    const promisePostData = postData(
      "https://meta.ml.ocas.ai/model/gpt3large/generate",
      {
        text: getReadyText(preProcessedText),
        config: {
          temperature: temp,
          length: length,
        },
      }
    );
    promisePostData.then((data) => {
      console.log(data);
      console.log(data.text);
      // edited = getEditedText(data.text);
      // console.log(edited);
    });
  };

  return <Button clickFunction={getRandomStrings}>{children}</Button>;
};
