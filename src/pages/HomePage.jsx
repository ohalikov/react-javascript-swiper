import React from "react";
import { useState, useEffect } from "react";
import { TextCard } from "../components/TextCard";
import { AcceptButton } from "../components/AcceptButton";
import { CancelButton } from "../components/CancelButton";
import { ReworkButton } from "../components/ReworkButton";

import { postData } from "./api.js";

const inputString = [
  "Дети, которые совершают насилие над собой совершают преступление",
  "Не дети, совершают насилие",
  "asdfsadfsa",
];
const nameAcceptButton = "Принять строку";
const nameCancelButton = "Отклонить строку";
const nameReworkButton = "Отправить на доработку";

const preProcessedText = [
  "у меня были попытки культивировать кокаиновый куст, не могу сказать, что это получилось, но теперь я знаю, на что обращать внимание при следующем культивировании",
  "чтобы вырастить коноплю, надо купить хорошую почву на торфяной или гумусовой основе, желательно, не очень щелочные, но чтоб было много азота, фосфора и кальция",
  "чтобы у тебя хороший урожай конопли был,  надо обязательно выдерживать долгий световой режим",
  "за кактусами вообще уход сложный, особенно если они мескалин содержат, там очень важно соблюдать правильный полив, а то растение не будет давать такой забойный эффект",
];

const getReadyText = (textForProcessed) => {
  let readyString = textForProcessed.reduce((prev, current, index) => {
    return `${prev}\n\nВариант текста другими словами ${
      index + 1
    }: "${current}"`;
  }, "");

  return readyString;
};

const defualtParams = {
  url: "https://meta.ml.ocas.ai/model/gpt3large/generate",
  prefix: "Вариант текста другими словами",
  temp: 0.9,
  length: 50,
  data: {
    text: getReadyText(preProcessedText),
    config: {
      temperature: this.temp,
      length: this.length,
    },
  },
};

export const HomePage = () => {
  const [currentStringIndex, setNextString] = useState(0);
  useEffect(() => {
    effect;
    return () => {
      cleanup;
    };
  }, [input]);
  console.log(currentStringIndex);
  return (
    <>
      <p className="label-string__card_block">Входная строка:</p>
      <TextCard stringValue={inputString} stringIndex={currentStringIndex} />
      <CancelButton>{nameCancelButton}</CancelButton>
      <ReworkButton>{nameReworkButton}</ReworkButton>
      <AcceptButton
        state={[currentStringIndex, setNextString, inputString.length]}
      >
        {nameAcceptButton}
      </AcceptButton>
    </>
  );
};
