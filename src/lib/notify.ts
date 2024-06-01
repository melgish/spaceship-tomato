import toast from 'react-hot-toast'

type Ok = { ok: true; message: string }
type Err = { ok: false; message: string }

export function notify<T extends Ok, E extends Err>(rs: T | E): rs is T {
  if (rs.ok) {
    toast.success(rs.message)
  } else {
    toast.error(rs.message)
  }
  return rs.ok
}
