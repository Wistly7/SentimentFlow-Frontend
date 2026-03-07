import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import React  from "react";

export const FilterSelect = ({ Icon,placeholder, options, value, onValueChange, className }:
    { Icon:React.ReactNode; placeholder: string; 
      options: { value: string; label: string }[], 
      value: string, onValueChange: (value: string) => void, 
      className: string }) => {
    return (
      <div className="space-y-2">
        <Label className="text-foreground flex items-center space-x-2 ">
          {Icon}
          <span>{placeholder}</span>
        </Label>
        <Select value={value} onValueChange={onValueChange} >
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  };