import { readDir, createDir, renameFile, BaseDirectory, type FileEntry } from '@tauri-apps/api/fs'

async function openDir(dirName: string) {
  const data = new Map<'success' | 'error' | 'files', boolean | FileEntry[]| unknown>()

  try {
    const files = await readDir(dirName, { dir: BaseDirectory.AppData, recursive: true })

    data.set('success', true)
    data.set('files', files)
  } catch (err) {
    data.set('success', false)
    data.set('error' ,err)
  }

  return data
}

async function addDir(dirName: string) {
  const data = new Map<'success' | 'error', boolean | unknown>()

  try {
    await createDir(`systems/${dirName}`, { dir: BaseDirectory.AppData, recursive: true })

    data.set('success', true)
  } catch (err) {
    data.set('success', false)
    data.set('error' ,err)
  }

  return data
}

async function rename(oldName: string, newName: string) {
  const data = new Map<'success' | 'error', boolean | unknown>()

  try {
    await renameFile(oldName, newName, { dir: BaseDirectory.AppData })

    data.set('success', true)
  } catch (err) {
    data.set('success', false)
    data.set('error' ,err)
  }

  return data
}

export {
  openDir,
  addDir,
  rename
}