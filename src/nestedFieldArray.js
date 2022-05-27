import { Button, CloseButton, FormLabel, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useFieldArray } from "react-hook-form";
import Collapsible from "./Collapsible";

export default ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `forms[${nestIndex}].modal.components`
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <Collapsible name={`Text Input ${k + 1}`} deleteButton={fields.length > 1 ? <CloseButton onClick={() => remove(k)} /> : null} key={item.id} style={{ marginLeft: 20 }}>

            <FormLabel htmlFor={`forms[${nestIndex}].modal.components[${k}].components[0].label`}>Label</FormLabel>
            <input
              {...register(`forms[${nestIndex}].modal.components[${k}].components[0].label`)}
              id={`forms[${nestIndex}].modal.components[${k}].components[0].label`}
              defaultValue={item.label}
              style={{ marginRight: "25px" }}
            />

            <FormLabel htmlFor={`forms[${nestIndex}].modal.components[${k}].components[0].style`}>Style</FormLabel>
            <input
              {...register(`forms[${nestIndex}].modal.components[${k}].components[0].style`)}
              id={`forms[${nestIndex}].modal.components[${k}].components[0].style`}
              defaultValue={item.style}
            />

            {/* <RadioGroup id={`forms.${nestIndex}.modal.components.${k}.components.0.style`}>
              <Stack direction="row">
                <Radio
                  name={`forms.${nestIndex}.modal.components.${k}.components.0.style`}

                  {...register(`forms[${nestIndex}].modal.components[${k}].components[0].style`)}

                  value="1"
                  className='radioText'
                >
                  <Text>Short</Text>
                </Radio>
                <Radio
                  name={`forms.${nestIndex}.modal.components.${k}.components.0.style`}
                  
                  {...register(`forms[${nestIndex}].modal.components[${k}].components[0].style`)}

                  value="2"
                  className='radioText'
                >
                  <Text className='radioText'>Paragraph</Text>
                </Radio>
              </Stack>
            </RadioGroup> */}

          </Collapsible>
        );
      })}
      <Button variant="primary" disabled={fields.length >= 5 ? true : false} onClick={() => append()}>Add Text Input</Button>
    </div>
  );
};