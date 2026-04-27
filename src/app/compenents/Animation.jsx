"use client"
import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { createRoot } from 'react-dom/client'
import MarioCursor from './MarioCursor'

const Animation = (props) => {
  const textRef = useRef(null)
  const cursorRootRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    const typed = new Typed(textRef.current, {
      strings:
        props.about === '1'
          ? ['FULL STACK DEVELOPER', 'GAME DEVELOPER', 'GRAPHIC DESIGNER']
          : ['VIDURA KAVINDA JAYATHILAKE', 'BSc in COMPUTER SCIENCE'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
      cursorChar: ' ', // create cursor span but without visible |
    })

    let observer;
    const mountCursor = () => {
      const cursorEl = textRef.current?.nextSibling
      if (!cursorEl || !(cursorEl instanceof HTMLElement)) return

      cursorEl.innerHTML = ''

      const mountNode = document.createElement('span')
      mountNode.style.display = 'inline-flex'
      mountNode.style.alignItems = 'center'
      mountNode.style.justifyContent = 'center'
      mountNode.style.width = '34px'
      mountNode.style.height = '34px'
      mountNode.style.transition = 'transform 0.1s ease-in-out'
      cursorEl.appendChild(mountNode)

      cursorRootRef.current = createRoot(mountNode)
      cursorRootRef.current.render(<MarioCursor />)

      let lastLen = 0;
      observer = new MutationObserver(() => {
        const currentLen = textRef.current?.textContent?.length || 0;
        if (currentLen < lastLen) {
          mountNode.style.transform = 'rotateY(180deg)';
        } else if (currentLen > lastLen) {
          mountNode.style.transform = 'rotateY(0deg)';
        }
        lastLen = currentLen;
      });
      if (textRef.current) {
        observer.observe(textRef.current, { characterData: true, childList: true, subtree: true });
      }
    }

    const timer = setTimeout(mountCursor, 0)

    return () => {
      clearTimeout(timer)
      if (observer) observer.disconnect()
      if (cursorRootRef.current) {
        cursorRootRef.current.unmount()
        cursorRootRef.current = null
      }
      typed.destroy()
    }
  }, [props.about])

  return (
    <div>
      <h1
        className="text-teal-300 text-sm sm:text-base md:text-2xl mt-2 inline-block"
        ref={textRef}
        style={{ fontFamily: "'Jacquard 12', cursive" }}
      />
    </div>
  )
}

export default Animation