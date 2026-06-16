import "./Badge.css";

export type BadgeType =
  | "admin"
  | "staff"
  | "manager"
  | "active"
  | "pending"
  | "new"
  | "inactive"
  | "urgent"
  | "overdue"
  | "basic"
  | "enterprise"
  | "pro";

interface BadgeProps {
  label: string;
  type: BadgeType;
}

export default function Badge({ label, type }: BadgeProps) {
  return <span className={`badge badge--${type}`}>{label}</span>;
}