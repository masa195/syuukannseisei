import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Privacy() {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">プライバシーポリシー</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. 基本方針</h2>
            <p className="text-muted-foreground">
              習慣トラッカーアプリ（以下「本サービス」）は、ユーザーの個人情報の保護を重要な責務と考え、
              個人情報保護法その他の関連法令を遵守し、適切な取扱いを行います。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. 個人情報の定義</h2>
            <p className="text-muted-foreground">
              本プライバシーポリシーにおいて「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、
              生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、
              連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、
              及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. 個人情報の収集方法</h2>
            <p className="text-muted-foreground">
              当社は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、
              銀行口座番号、クレジットカード番号、運転免許証番号などの個人情報をお尋ねすることがあります。
              また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、
              当社の提携先（情報提供元、広告主、広告配信先などを含みます。以下、「提携先」）などから収集することがあります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. 個人情報を収集・利用する目的</h2>
            <p className="text-muted-foreground">
              当社が個人情報を収集・利用する目的は、以下のとおりです。
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>本サービスの提供・運営のため</li>
              <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
              <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため</li>
              <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
              <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
              <li>ユーザーにご自身の登録情報の閲覧・変更・削除・ご利用状況の閲覧を行っていただくため</li>
              <li>有料サービスにおいて、ユーザーに利用料金を請求するため</li>
              <li>上記の利用目的に付随する目的</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. 利用目的の変更</h2>
            <p className="text-muted-foreground">
              当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、
              個人情報の利用目的を変更するものとします。
              利用目的の変更を行った場合には、変更後の目的について、当社所定の方法により、
              ユーザーに通知し、または本ウェブサイト上に公表するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. 個人情報の第三者提供</h2>
            <p className="text-muted-foreground">
              当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、
              第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
              <li>予め次の事項を告知あるいは公表し、かつ当社が個人情報保護委員会に届出をしたとき</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. 個人情報の開示</h2>
            <p className="text-muted-foreground">
              当社は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。
              ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、
              開示しない決定をした場合には、その旨を遅滞なく通知します。
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合</li>
              <li>当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合</li>
              <li>その他法令に違反することとなる場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. 個人情報の訂正及び削除</h2>
            <p className="text-muted-foreground">
              ユーザーは、当社の保有する自己の個人情報が誤った情報である場合には、
              当社が定める手続により、当社に対して個人情報の訂正、追加または削除（以下、「訂正等」）を請求することができます。
              当社は、ユーザーから前項の請求を受けてその請求に理由があると判断した場合には、
              遅滞なく、当該個人情報の訂正等を行うものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. 個人情報の利用停止等</h2>
            <p className="text-muted-foreground">
              当社は、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、
              または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下、「利用停止等」）を求められた場合には、
              遅滞なく必要な調査を行います。
              前項の調査結果に基づき、その請求に理由があると判断した場合には、遅滞なく、当該個人情報の利用停止等を行います。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. プライバシーポリシーの変更</h2>
            <p className="text-muted-foreground">
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、
              ユーザーに通知することにより、変更することができるものとします。
              なお、当社が別途定める場合を除いて、変更後のプライバシーポリシーは、
              本ウェブサイトに掲載したときから効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. お問い合わせ窓口</h2>
            <p className="text-muted-foreground">
              本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>習慣トラッカーアプリ プライバシー担当</strong><br />
                メールアドレス: privacy@habit-tracker.com<br />
                受付時間: 平日 9:00-18:00
              </p>
            </div>
          </section>

          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              制定日：2024年1月1日<br />
              最終更新日：2024年1月1日
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
