import React from "react";
import { useState, useEffect } from "react";
import { TextCard } from "../components/TextCard";
import { AcceptButton } from "../components/AcceptButton";
import { CancelButton } from "../components/CancelButton";
import { ReworkButton } from "../components/ReworkButton";

import { fetchData } from "../api/api.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

const getNotEmptyData = async (nameV) => {
  while (true) {
    const data = await getString();
    console.log(`generation string ${nameV}-> ${data}`);
    if (data.replace("\n", "")) return data;
  }
};

const queryToGetGenerationText = (nameDataReturn = "", nameQuery) => {
  return useQuery(["string", nameQuery], {
    queryFn: () => getNotEmptyData(nameQuery),
  });
};

export const HomePage = () => {
  const queryClient = useQueryClient();
  // const [currentString, setCurrentString] = useState("");
  const [futureString, setFutureString] = useState("");
  const [changedText, setChangedText] = useState(""); // Change textarea
  const [preventSaveText, setPreventSaveText] = useState("");
  const [saveText, setSaveText] = useState("");
  const [index, setIndex] = useState(0);
  // REACT QUERY
  const { data: currentString, isLoading } = useQuery(["string", index], {
    queryFn: () => getNotEmptyData(index),
  });
  const { data: nextString, isLoading: isLoad2 } = useQuery(
    ["string", index + 1],
    {
      queryFn: () => getNotEmptyData(index + 1),
    }
  );

  renderCount++;

  // MUTATION
  const mutation = useMutation((newString) => {
    setSaveText(newString);
    setIndex((prevIndex) => prevIndex + 1);
    // отправлять в localstorage
    // getNotEmptyData("next string 1->");
    // getNotEmptyData("next string 2->");
  });

  // SET CHANGES from textarea
  const myOwnSubmit = (data) => {
    setChangedText(data);
    console.log(`watch->`, data);
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <p className="label-string__card_block">Render Count: {renderCount}</p>

      <TextCard
        key={currentString}
        text={currentString}
        futureText={nextString}
        // rememberText={setFutureString}
        onSubmit={setChangedText}
      />
      <button onClick={() => setIndex((prev) => (prev === 0 ? 0 : prev - 1))}>
        Back
      </button>
      <CancelButton>{nameCancelButton}</CancelButton>
      <ReworkButton>{nameReworkButton}</ReworkButton>
      <button
        disabled={isLoad2}
        onClick={() => {
          if (changedText === "") {
            console.log("firstQueryString ->", currentString);
            console.log("preventSaveText ->", preventSaveText);
            // setSaveText(preventSaveText);
          } else {
            console.log("changedText->", changedText);
            mutation.mutate(changedText?.textArea, {
              onSuccess: () => {
                console.log(`saveText-> ${saveText}`, saveText);
              },
            });
            // getNotEmptyData("next string");
            console.log(`saveText-> ${saveText}`, saveText);
          }
        }}
      >
        принять!!!
      </button>
      <button
        onClick={() =>
          setIndex((prev) => (prev <= setIndex.length ? prev + 1 : prev))
        }
      >
        Next
      </button>
      {/* <AcceptButton state={[nextString, setValueInForm, getNotEmptyData]}>
        {nameAcceptButton}
      </AcceptButton> */}
    </>
  );
};
