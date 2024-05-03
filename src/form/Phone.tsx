// import "react-international-phone/style.css";

// import { CountryIso2, defaultCountries, FlagImage, parseCountry, usePhoneInput } from "react-international-phone";
// import { useController } from "react-hook-form";

// export const MuiPhone = ({ source, label }: { source: string; label: string }) => {
//     const {
//         field,
//         fieldState: { isTouched, invalid, error },
//         formState: { isSubmitted },
//     } = useController({ name: `${source}`, defaultValue: record[source] ?? "" });

//     const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
//         defaultCountry: "kg",
//         value: field.value,
//         countries: defaultCountries,
//         onChange: (data) => {
//             field.onChange(data.phone);
//         },
//     });

//     return (
//         <TextField
//             name={field.name}
//             value={inputValue}
//             ref={field.ref}
//             onBlur={field.onBlur}
//             onChange={handlePhoneValueChange}
//             inputRef={inputRef}
//             variant="outlined"
//             label={label}
//             color="primary"
//             type="tel"
//             fullWidth
//             required
//             error={(isTouched || isSubmitted) && invalid}
//             helperText={(isTouched || isSubmitted) && invalid ? error?.message : ""}
//             InputProps={{
//                 startAdornment: (
//                     <InputAdornment position="start">
//                         <Select
//                             MenuProps={{
//                                 style: {
//                                     height: "300px",
//                                     width: "360px",
//                                     top: "10px",
//                                     left: "-34px",
//                                 },
//                                 transformOrigin: {
//                                     vertical: "top",
//                                     horizontal: "left",
//                                 },
//                             }}
//                             sx={{
//                                 width: "max-content",
//                                 fieldset: {
//                                     display: "none",
//                                 },
//                                 '&.Mui-focused:has(div[aria-expanded="false"])': {
//                                     fieldset: {
//                                         display: "block",
//                                     },
//                                 },
//                                 ".MuiSelect-select": {
//                                     padding: "8px",
//                                     paddingRight: "24px !important",
//                                 },
//                                 svg: {
//                                     right: 0,
//                                 },
//                             }}
//                             value={country.iso2}
//                             onChange={(e) => setCountry(e.target.value as CountryIso2)}
//                             renderValue={(value) => (
//                                 <FlagImage
//                                     iso2={value}
//                                     style={{ display: "flex" }}
//                                 />
//                             )}
//                         >
//                             {defaultCountries.map((c) => {
//                                 const country = parseCountry(c);
//                                 return (
//                                     <MenuItem
//                                         key={country.iso2}
//                                         value={country.iso2}
//                                     >
//                                         <FlagImage
//                                             iso2={country.iso2}
//                                             style={{ marginRight: "8px" }}
//                                         />
//                                         <Typography marginRight="8px">{country.name}</Typography>
//                                         <Typography color="gray">+{country.dialCode}</Typography>
//                                     </MenuItem>
//                                 );
//                             })}
//                         </Select>
//                     </InputAdornment>
//                 ),
//             }}
//         />
//     );
// };
