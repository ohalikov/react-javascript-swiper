import React from "react";
import { useState, useEffect } from "react";
import { TextCard } from "../components/TextCard";
import { AcceptButton } from "../components/AcceptButton";
import { CancelButton } from "../components/CancelButton";
import { ReworkButton } from "../components/ReworkButton";

import { fetchData } from "../api/api.js";
import { useQuery } from "@tanstack/react-query";

let renderCount = 0;

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
    .replace(new RegExp(/Вариант текста другими словами 5:/), "")
    .replaceAll('"', "")
    .trim();
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
const getString = async () => {
  const data = await fetchData(defualtParams.url, defualtParams.data);
  const edited = executeNormalText(data.text);
  return edited;
};

const getNotEmptyData = async () => {
  while (true) {
    const data = await getString();
    console.log(`next data -> ${data}`);
    if (data.replace("\n", "")) return data;
  }
};

export const HomePage = () => {
  const { data: currentGenerationString } = useQuery(["string", "first"], {
    queryFn: getNotEmptyData,
  });
  const { data: nextString } = useQuery(["string", "second"], {
    queryFn: getNotEmptyData,
  });
  renderCount++;
  const [, setString] = useState("");
  const [, setNextString] = useState("");
  const [changedString, setChangedString] = useState(null);

  const nextDataFetch = async () => {};

  // useEffect(() => {
  //   let ignore = false;
  //   return () => {
  //     if (!ignore) {
  //       getNotEmptyData().then(setString);
  //       getNotEmptyData().then(setNextString);
  //     }
  //     ignore = true;
  //   };
  // }, []);

  return (
    <>
      <p className="label-string__card_block">Render Count: {renderCount}</p>
      <TextCard
        text={changedString ? changedString : currentGenerationString}
        rememberText={setChangedString}
      />
      <CancelButton>{nameCancelButton}</CancelButton>
      <ReworkButton>{nameReworkButton}</ReworkButton>
      <AcceptButton state={[nextString, setString, nextDataFetch]}>
        {nameAcceptButton}
      </AcceptButton>
    </>
  );
};
