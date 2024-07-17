'use client';
import './task_page_styles.css';
import Task from '@/components/task/page';
import { useState, useEffect } from 'react';
import { Toaster, toast } from "sonner";

export default function TaskPage() {
  const [userId, setUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const { user } = window.Telegram.WebApp.initDataUnsafe;
    if (user && user.id) {
      setUserId(user.id);
    } else {
      toast.error("Error on telegram side. Try later")
      setUserId(undefined);
    }
  }, []);

  return (
    <main>
      <Toaster position="top-center" richColors />
      <div id="hi-container">
        <h1>Earn more coins!</h1>
        <p id="text-list-of-task">List of tasks</p>
      </div>

      <div id="task-container">
        {userId !== undefined && (
          <>
            <Task
              task_in_db="task1"
              task_name="Youtube"
              task_price={50000}
              url_of_btn="https://youtube.com"
              user_id={Number(userId)}
            />
            <Task
              task_in_db="task2"
              task_name="Telegram"
              task_price={50000}
              url_of_btn="https://youtube.com"
              user_id={Number(userId)}
            />
            <Task
              task_in_db="task3"
              task_name="Instagram"
              task_price={50000}
              url_of_btn="https://youtube.com"
              user_id={Number(userId)}
            />
            <Task
              task_in_db="task4"
              task_name="VK"
              task_price={50000}
              url_of_btn="https://youtube.com"
              user_id={Number(userId)}
            />
          </>
        )}
      </div>

      <footer id="footer">
        <a id="footer_text" href="/" style={{ textDecoration: 'none' }}>
          🪙<br />Tap
        </a>
        <a id="footer_text" href="ref-page" style={{ textDecoration: 'none' }}>
          👨‍💼<br />Ref
        </a>
        <a id="footer_text" className="task-btn" style={{ textDecoration: 'none' }}>
          📝<br />Task
        </a>
      </footer>
    </main>
  );
}
