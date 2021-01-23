/// command index URL where lilypond command index is hosted
const url = `http://lilypond.org/doc/v2.20/Documentation/notation/lilypond-command-index`

import * as puppeteer from 'puppeteer'
import * as fs from 'fs'

/// details on page parsed as object
type CodeTokenElement = {
    code: string
    description: string
    href: string
}

type SnippetElement = {
    prefix: string[]
    body: string[]
    description: string
}

const getCodeTokens = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    page.on('console', (msg) => {
        console.log(msg.text())
    })
    await page.goto(url)
    const elems = await page.evaluate(() => {
        /*
<tr>
<td></td>
<td valign="top">
<a href="expressive-marks-attached-to-notes#index-_005c_0021-1">
  <code>\!</code>
</a>
</td>
<td valign="top">
<a href="expressive-marks-attached-to-notes#dynamics">Dynamics</a>
</td>
</tr>
         */

        const htmlDecode = (input: string) => {
            var e = document.createElement('textarea')
            e.innerHTML = input
            // handle case of empty input
            return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
        }

        const tableRows = Array.from(
            document.querySelectorAll('table.index-ky > tbody > tr')
        )

        const tableRowsWithThreeTds = tableRows.filter(
            (tr: HTMLTableRowElement) => {
                const children = Array.from(tr.children)
                const tds = children.filter((c) => c.nodeName === `TD`)
                return tds.length === 3
            }
        )

        const codeTokenElems = tableRowsWithThreeTds.map(
            (tr: HTMLTableRowElement) => {
                const children: HTMLTableCellElement[] = <
                    HTMLTableCellElement[]
                >Array.from(tr.children)
                const codeElement: Element =
                    children[1].firstElementChild.firstElementChild
                const descElement: HTMLLinkElement = <HTMLLinkElement>(
                    children[2].firstElementChild
                )
                const res: CodeTokenElement = {
                    code: htmlDecode(codeElement.innerHTML),
                    description: htmlDecode(descElement.innerHTML),
                    href: descElement.href,
                }
                return res
            }
        )

        return codeTokenElems
    })

    await browser.close()
    return elems
}

const processSnippetBody = (code: string) => {
    return code.replace(`...`, `$0`).replace(`…`, `$0`)
}

/// MAIN ENTRY
;(async () => {
    const elems = await getCodeTokens()
    const snippetElems: SnippetElement[] = elems.map((e: CodeTokenElement) => {
        const res: SnippetElement = {
            prefix: [e.code],
            body: [processSnippetBody(e.code)],
            description: `${e.description} - ${e.href}`,
        }
        return res
    })
    const snippetObject = Object.assign({}, snippetElems)
    const snippetObjectString = JSON.stringify(snippetObject, null, `\t`)

    fs.writeFileSync('snippets/snippets.json', snippetObjectString)
})()
