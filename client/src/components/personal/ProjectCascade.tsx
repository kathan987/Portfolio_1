
import React from "react";
import { motion } from "framer-motion";
import "../../styles/personal/project-cascade.css";

type Item = {
  title: string;
  subtitle?: string;
  year?: string;
  color?: string;
  children?: React.ReactNode;
};

type Props = {
  items: Item[];
};

export default function ProjectCascade({ items }: Props) {
  return (
    <div className="cascade-root">
      {items.map((it, i) => (
        <motion.article
          key={i}
          className="cascade-card"
          style={{ background: it.color || "var(--card-bg, #0b1220)" }}
          initial={{ opacity: 0, y: 80, rotateX: 12, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", duration: 0.9, bounce: 0.24, delay: i * 0.08 }}
          whileHover={{ rotateX: -2, rotateY: 2, y: -6 }}
        >
          {it.year && <span className="cascade-year">{it.year}</span>}
          <h3 className="cascade-title">{it.title}</h3>
          {it.subtitle && <p className="cascade-sub">{it.subtitle}</p>}
          <div className="cascade-body">{it.children}</div>
        </motion.article>
      ))}
    </div>
  );
}
