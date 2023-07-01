import React from 'react'

export const Container = ({ children }: { children: React.ReactNode }) => {
	return <div className="flex flex-col p-4 space-y-4">{children}</div>
}
