import{j as e}from"./index-CmFasXUh.js";const n=({formData:l,categories:o,handleChange:s,handleSubmit:t})=>e.jsxs("form",{onSubmit:t,children:[e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-lg-12",children:e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-md-6 col-lg-4",children:[e.jsx("label",{className:"title-color",htmlFor:"subCategoryName",children:"Sub Category Name"}),e.jsx("input",{type:"text",name:"name",value:l.name,onChange:s,className:"form-control",id:"subCategoryName",placeholder:"New Sub Category"}),e.jsx("input",{type:"hidden",name:"hiddenField",value:"someValue"}),e.jsx("input",{name:"position",value:"1",className:"d-none"})]}),e.jsxs("div",{className:"form-group col-md-6 col-lg-4",children:[e.jsxs("label",{className:"title-color",htmlFor:"mainCategory",children:["Main Category ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"mainCategory",name:"mainCategory",value:l.mainCategory,onChange:s,className:"form-control",required:!0,children:[e.jsx("option",{value:"",disabled:!0,children:"Select main category"}),o.map(r=>e.jsx("option",{value:r._id,children:r.name},r._id))]})]}),e.jsxs("div",{className:"form-group col-md-6 col-lg-4",children:[e.jsx("label",{className:"title-color",htmlFor:"priority",children:"Priority"}),e.jsxs("select",{className:"form-control",name:"priority",value:l.priority,onChange:s,id:"priority",required:!0,children:[e.jsx("option",{value:"",disabled:!0,children:"Set Priority"}),Array.from({length:11},(r,a)=>e.jsx("option",{value:a,children:a},a))]})]})]})})}),e.jsxs("div",{className:"d-flex flex-wrap gap-2 justify-content-end",children:[e.jsx("button",{type:"reset",className:"btn bg-secondary-500 border border-secondary-500",children:"Reset"}),e.jsx("button",{type:"submit",className:"btn bg-primary-500 text-white hover:bg-primary-dark-500 hover:text-white",style:{color:"white"},children:"Submit"})]})]});export{n as default};