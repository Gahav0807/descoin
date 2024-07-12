'use client';
import './ref-page-styles.css';
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from "sonner";
import Referal from "@/components/referal/page"

// тестовые данные
const userId = 1573326140;
const userName = "Jhonffffffffffffffffffffffffffffffffffff";

export default function RefPage() {
  const [linkToCopy, setLinkToCopy] = useState(`https://t.me/bot_name?start=`+userId);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToCopy);
    toast.success("Link copied to clipboard!");
  };

  useEffect(()=> {
  async function getReferals(userId) {
    try {
      // Выполняем запрос к серверу для получения списка рефералов по userId
      let response = await fetch(`http://localhost:9000/getReferals/${userId}`);
      let data = await response.json();
      setFriends(data);
      setIsLoading(false);
      
    } catch (error) {
      toast.error("Error!Try later");
    }
  }

  getReferals(userId);
});

  return (
    <main>
      <Toaster position="top-center" richColors />
        <div className="user_info">
        <div id="avatar">
            <div id="profile_logo_head"></div>
            <div id="profile_logo_neck"></div>
        </div>
        <p id="name_of_user">{userName}</p>
        <button id="copy_url_of_ref_btn" onClick={handleCopyLink}>COPY YOUR LINK</button> 
        </div>
    
        <div id="list_of_referals">
        {isLoading ? (
            <p className="load-friends">Loading</p>
          ) : friends.length === 0 ? (
            <p className="load-friends">You don't have any friends.</p>
          ) : (
            <div className="list-of-friends">
              {friends.map((friend, index) => (
                <Referal
                  index={index + 1}
                  name={friend.referal_name}
                />
              ))}
            </div>
      )}
        </div>
    
        <footer id="footer">
         <a id="footer_text" href="clicker-page" style={{ textDecoration: 'none' }}>
           🪙<br />Tap
         </a>
         <a id="footer_text" className="ref_btn" style={{ textDecoration: 'none' }}>
           👨‍💼<br />Ref
         </a>
         <a id="footer_text" href="task-page" style={{ textDecoration: 'none' }}>
           📝<br />Task
         </a>
       </footer>
    </main>
  );
}
