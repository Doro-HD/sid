import { get, readable } from 'svelte/store'

import {
  writeTextFile,
  readDir,
  createDir,
  renameFile,
  BaseDirectory,
  type FileEntry
} from '@tauri-apps/api/fs'

type FsResult = {
  success: boolean
  error: null|unknown
}

type FsFileResult = FsResult & {
  files: FileEntry[]
}

const paths = readable({ systems: 'systems', sheets: 'sheets', entities: 'entities' })

async function createJsonFile(name: string, content: {}) {
  return createFile(name, 'json', JSON.stringify(content))
}

async function createFile(name: string, extention: string, content: string) {
  const data: FsResult = { success: false, error: null }

  try {
    await writeTextFile(
      `${name}.${extention}`,
      content,
      { dir: BaseDirectory.AppData })

    data.success =  true
  } catch (err) {
    data.error = err
  }

  return data
}

async function openDir(dirName: string) {
  const data: FsFileResult = { success: false, error: null, files: [] }

  try {
    const files = await readDir(dirName, { dir: BaseDirectory.AppData, recursive: true })

    data.success =  true
    data.files = files
  } catch (err) {
    data.error = err
  }

  return data
}

async function addDir(dirName: string) {
  const data: FsResult = { success: false, error: null }

  try {
    await createDir(`${get(paths).systems}/${dirName}`, { dir: BaseDirectory.AppData, recursive: true })

    data.success = true
  } catch (err) {
    data.error = err
  }

  return data
}

async function rename(oldName: string, newName: string) {
  const data: FsResult = { success: false, error: null }

  try {
    await renameFile(oldName, newName, { dir: BaseDirectory.AppData })

    data.success = true
  } catch (err) {
    data.error = err
  }

  return data
}

export {
  paths,
  createJsonFile,
  openDir,
  addDir,
  rename
}