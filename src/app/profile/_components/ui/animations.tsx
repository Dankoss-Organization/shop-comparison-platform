/**
 * @file animations.ts
 * @description Reusable Framer Motion variant configurations for staggered container animations
 * and spring-physics-based item entrances. Used globally across the application for consistent UI transitions.
 */
import { Variants } from "framer-motion";
/**
 * Framer Motion variants for a parent container.
 * Orchestrates the entrance of child components using a staggered delay.
 * * @constant
 * @type {Variants}
 * @property {Object} hidden - Initial state: the container is completely transparent.
 * @property {Object} show - Animated state: fades to full opacity and triggers the `show` variant of its children with a 0.1s stagger.
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
/**
 * Framer Motion variants for individual child items.
 * Applies a smooth, spring-based upward slide and fade-in effect.
 * * @constant
 * @type {Variants}
 * @property {Object} hidden - Initial state: the item is transparent and translated down by 20px.
 * @property {Object} show - Animated state: the item fades in and moves to its original position (y: 0) utilizing spring physics for a natural bounce.
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};