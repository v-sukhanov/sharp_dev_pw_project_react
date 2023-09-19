import { TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import React, { memo, useState } from 'react';

export interface IOutlinedAmountInputProps {
	initialValue?: number;
	amountChange: (val: any) => void;
}

export const OutlinedAmountInput = memo(({initialValue, amountChange}: IOutlinedAmountInputProps) => {
	return <NumericFormat value={initialValue} thousandSeparator=" "
      onValueChange={(e: { floatValue: any; }) => amountChange(e.floatValue ?? 0)}
      customInput={(props: any, context: any) => {
          return <TextField  {...props as any} label="PW amount" fullWidth variant="outlined"/>
      }}
	/>
})
