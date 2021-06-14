export type ContentType = 'f' | 'b'

export type VersionItem = {
  current?: boolean
  name: string
  ts: string
  contents: ContentType[]
}

const _default: { [version: string]: VersionItem } = {
  "1.6.1": {
    current: true,
    name: "Ooka Shin-01",
    ts: "2021-05-18",
    contents: [
      "f"
    ]
  },
  "1.6.0": {
    name: "Ooka Shin",
    ts: "2021-04-07",
    contents: [
      "f"
    ]
  },
  "1.5.2": {
    name: "Rilke-02",
    ts: "2021-04-06",
    contents: [
      "b"
    ]
  },
  "1.5.1": {
    name: "Rilke-01",
    ts: "2021-03-31",
    contents: [
      "b"
    ]
  },
  "1.5.0": {
    name: "Rilke",
    ts: "2021-03-30",
    contents: [
      "f",
      "f"
    ]
  },
  "1.4.1": {
    name: "Zhang Zao-01",
    ts: "2021-03-01",
    contents: [
      "f"
    ]
  },
  "1.4.0": {
    name: "Zhang Zao",
    ts: "2021-02-26",
    contents: [
      "f"
    ]
  },
  "1.3.1": {
    name: "Baudelaire-01",
    ts: "2021-02-23",
    contents: [
      "b"
    ]
  },
  "1.3.0": {
    name: "Baudelaire",
    ts: "2021-02-22",
    contents: [
      "f",
      "f"
    ]
  },
  "1.2.0": {
    ts: "2021-02-14",
    name: "Robert Lowell",
    contents: [
      "f",
      "b"
    ]
  },
  "1.1.2": {
    ts: "2021-01-05",
    name: "Li Shangyin-02",
    contents: [
      "f",
      "f"
    ]
  },
  "1.1.1": {
    ts: "2020-12-31",
    name: "Li Shangyin-01",
    contents: [
      "f",
      "b"
    ]
  },
  "1.1.0": {
    ts: "2020-12-28",
    name: "Li Shangyin",
    contents: [
      "f",
      "f"
    ]
  },
  "1.0.1": {
    ts: "2020-12-18",
    name: "Rimbaud-01",
    contents: [
      "f"
    ]
  },
  "1.0.0": {
    ts: "2020-12-10",
    name: "Rimbaud",
    contents: [
      "f"
    ]
  }
}

export default _default