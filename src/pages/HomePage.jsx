import React from "react";
import { useState, useEffect } from "react";
import { TextCard } from "../components/TextCard";
import { AcceptButton } from "../components/AcceptButton";
import { CancelButton } from "../components/CancelButton";
import { ReworkButton } from "../components/ReworkButton";

import { fetchData } from "../api/api.js";

const defaultString = [
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

const temp = 0.9;
const length = 50;

const executeNormalText = (text) => {
  const editedString = text
    .split("\n\n")
    .filter((x) => !!x)[0]
    .replace(new RegExp(/Вариант текста другими словами 5:/), "");
  return editedString;
};

const getEditedText = (textForProcessed) => {
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
  data: {
    text: getEditedText(preProcessedText),
    config: {
      temperature: temp,
      length: length,
    },
  },
};

// console.log(defualtParams);

export const HomePage = () => {
  const [currentGenerationString, setString] = useState("");
  const [nextString, setNextString] = useState("");

  const getString = async () => {
    const data = await fetchData(defualtParams.url, defualtParams.data);
    const edited = executeNormalText(data.text);
    return edited;
  };

  const nextDataFetch = async () => {
    let noEmptyString = "";
    let data = "";
    while (!noEmptyString) {
      data = await getString();
      console.log(`next data -> ${data}`);
      data.replace("\n", "") ? (noEmptyString = true) : false;
    }
    setNextString(data);
  };

  const dataFetch = async () => {
    let noEmptyString = "";
    let data = "";
    while (!noEmptyString) {
      data = await getString();
      console.log(`current data -> ${data}`);
      data.replace("\n", "") ? (noEmptyString = true) : false;
    }
    setString(data);
  };

  useEffect(() => {
    let ignore = false;
    return () => {
      if (!ignore) {
        dataFetch();
        nextDataFetch();
      }
      ignore = true;
    };
  }, []);

  return (
    <>
      <p className="label-string__card_block">Входная строка:</p>
      <TextCard
        stringValue={defaultString}
        textCard={currentGenerationString}
      />
      <CancelButton>{nameCancelButton}</CancelButton>
      <ReworkButton>{nameReworkButton}</ReworkButton>
      <AcceptButton state={[nextString, setString, nextDataFetch]}>
        {nameAcceptButton}
      </AcceptButton>
    </>
  );
};
