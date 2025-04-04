"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"
import { p2pTransferto } from "../app/lib/actions/p2pTransfer"

export default function SendCard(){
    const [number, setNumber]=useState("");
    const[amount, setAmount]=useState("");
return <div className="h-[90vh]">
         <Center>
        <Card title="Send">
        <div className="min-w-72 p-2">
        <TextInput label="Number" placeholder="78554996" onChange={(value)=>{
            setNumber(value)
        }}/>
        <TextInput label="Amount" placeholder="2000" onChange={(value)=>{
            setAmount(value);
        }} />
        </div>
        <div className="flex justify-center pt-2">
            <Button onClick={async()=>{
                    await p2pTransferto({to:number,amount:Number(amount)*100})
            }} >
                Send
            </Button>
        </div>
        </Card>
        </Center>
    </div>
}