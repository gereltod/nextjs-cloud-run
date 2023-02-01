"use client"

import { useState } from 'react'
import useSWR from "swr"
import Link from "next/link"
import Form from '../../components/form'

const fetcher = (path) => fetch(`https://test-app-lkcqmqcklq-uc.a.run.app/api/${path}`).then(res => res.json())

export default function Clientpage() {
	const characters = useSWR("reference", fetcher)

  const [errorMsg, setErrorMsg] = useState('')

	async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')
   

    const body = {
      email: e.target.elements.username.value,
      password_hash: e.target.elements.password.value,
    }

    try {
			console.log(JSON.stringify(body))
      const res = await fetch('https://test-app-lkcqmqcklq-uc.a.run.app/api/auth/login', {
      // const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
				// host: 'localhost',
				//mode: 'no-cors',
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
				console.log(res);
        //Router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

	return (
		<div>
			<div className="login">
        <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
			<h2>Client Fetching</h2>
			{characters?.data?.map(c =>
				<ul key={c.list_id}>
					<Link href={`/staticprops/${c.list_name}`}>
						<li>
							{c.list_name}
						</li>
					</Link>
				</ul>
			)}
		</div>
	)
}


