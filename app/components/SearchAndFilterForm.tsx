import { Form } from "@remix-run/react"
import iconSort from "../assets/images/sort-icon.svg";

export default function SearchAndFilterForm() {
  return (
   <div className="flex flex-row justify-between items-center w-full mt-12 px-4">
    <Form reloadDocument className="w-[80%]">
      <label>
        <input type="text" name="name" placeholder="Search Pokemon" className="border-none rounded py-2 px-3 mr-2 w-[50%]"/>
      </label>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-md">Search</button>
    </Form>
    <button className="border-none w-[40px] h-[40px] bg-white rounded-md p-1">
      <img src={iconSort} alt="" />
    </button>
  </div>
  )
}
