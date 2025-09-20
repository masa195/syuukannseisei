import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Terms() {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">利用規約</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">第1条（適用）</h2>
            <p className="text-muted-foreground">
              本利用規約（以下「本規約」）は、習慣トラッカーアプリ（以下「本サービス」）の利用条件を定めるものです。
              ユーザーは、本サービスを利用することにより、本規約に同意したものとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第2条（利用登録）</h2>
            <p className="text-muted-foreground">
              本サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、
              当社がこれを承認することによって、利用登録が完了するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第3条（ユーザーIDおよびパスワードの管理）</h2>
            <p className="text-muted-foreground">
              ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
              ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、
              もしくは第三者と共用することはできません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第4条（禁止事項）</h2>
            <p className="text-muted-foreground">
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium">法令・公序良俗に関する禁止事項</h3>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>暴力、脅迫、詐欺等の反社会的行為</li>
                  <li>未成年者に有害な情報を提供する行為</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">知的財産権に関する禁止事項</h3>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為</li>
                  <li>第三者の著作権、商標権、肖像権等を侵害する行為</li>
                  <li>本サービスによって得られた情報を商業的に利用する行為</li>
                  <li>リバースエンジニアリング、逆コンパイル、逆アセンブル等の行為</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">システム・セキュリティに関する禁止事項</h3>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>当社、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                  <li>不正アクセスをし、またはこれを試みる行為</li>
                  <li>ウイルス、マルウェア等の有害なプログラムを送信する行為</li>
                  <li>他人のアカウントを無断で使用する行為</li>
                  <li>パスワードや認証情報を第三者に提供する行為</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">サービス運営に関する禁止事項</h3>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>当社のサービスの運営を妨害するおそれのある行為</li>
                  <li>虚偽の情報を登録する行為</li>
                  <li>複数のアカウントを作成する行為</li>
                  <li>自動化されたツールやボットを使用する行為</li>
                  <li>その他、当社が不適切と判断する行為</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第5条（本サービスの提供の停止等）</h2>
            <p className="text-muted-foreground">
              当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく
              本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、当社が本サービスの提供が困難と判断した場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第6条（利用制限および登録抹消）</h2>
            <p className="text-muted-foreground">
              当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、
              ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>本規約のいずれかの条項に違反した場合</li>
              <li>登録事項に虚偽の事実があることが判明した場合</li>
              <li>料金等の支払債務の不履行があった場合</li>
              <li>当社からの連絡に対し、一定期間返答がない場合</li>
              <li>本サービスについて、最終の利用から一定期間利用がない場合</li>
              <li>その他、当社が本サービスの利用を適当でないと判断した場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第7条（退会）</h2>
            <p className="text-muted-foreground">
              ユーザーは、当社の定める退会手続により、本サービスから退会できるものとします。
            </p>
            <div className="mt-4 space-y-3">
              <h3 className="text-lg font-medium">退会手続き</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>アプリ内の「設定」→「アカウント管理」→「退会」を選択</li>
                <li>退会理由の選択（任意）</li>
                <li>退会確認画面で「退会する」をクリック</li>
                <li>退会完了の確認メールが送信されます</li>
              </ol>
              
              <h3 className="text-lg font-medium">退会に関する注意事項</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>退会後はアカウントの復旧はできません</li>
                <li>退会前に保存されたデータは削除されます</li>
                <li>有料プランをご利用の場合は、退会手続き完了まで料金が発生します</li>
                <li>退会後も利用規約の一部条項（免責事項等）は継続して適用されます</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第8条（料金および支払い）</h2>
            <p className="text-muted-foreground">
              本サービスは、無料プランと有料プランを提供しています。
            </p>
            <div className="mt-4 space-y-3">
              <h3 className="text-lg font-medium">料金プラン</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-green-600">無料プラン</h4>
                  <p className="text-sm text-muted-foreground">基本機能を無料でご利用いただけます</p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• 習慣登録（最大5個）</li>
                    <li>• 基本的な統計</li>
                    <li>• 町育成ゲーム（基本機能）</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600">プロプラン</h4>
                  <p className="text-sm text-muted-foreground">月額980円</p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• 無制限の習慣登録</li>
                    <li>• 詳細な統計とレポート</li>
                    <li>• 町育成ゲーム（全機能）</li>
                    <li>• 優先サポート</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600">プレミアムプラン</h4>
                  <p className="text-sm text-muted-foreground">月額1,980円</p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• プロプランの全機能</li>
                    <li>• 特別な建物とエリア</li>
                    <li>• カスタムテーマ</li>
                    <li>• 専用サポート</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-lg font-medium">支払い方法</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>PayPal決済システムを使用</li>
                <li>月額自動更新（解約はいつでも可能）</li>
                <li>初回利用時のみ決済処理が発生</li>
                <li>返金は初回決済から7日以内に限り対応</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第9条（保証の否認および免責事項）</h2>
            <p className="text-muted-foreground">
              当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、
              特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）
              がないことを明示的にも黙示的にも保証しておりません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第9条（サービス内容の変更等）</h2>
            <p className="text-muted-foreground">
              当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、
              これによってユーザーに生じた損害について一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第10条（利用規約の変更）</h2>
            <p className="text-muted-foreground">
              当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
              なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第11条（個人情報の取扱い）</h2>
            <p className="text-muted-foreground">
              当社は、本サービスの利用によって取得する個人情報については、当社「プライバシーポリシー」に従い適切に取り扱うものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第12条（通知または連絡）</h2>
            <p className="text-muted-foreground">
              ユーザーと当社との間の通知または連絡は、当社の定める方法によって行うものとします。
              当社は、ユーザーから、当社が別途定める方式に従った変更届け出がない限り、
              現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、
              これらは、発信時点でユーザーへ到達したものとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第13条（権利義務の譲渡の禁止）</h2>
            <p className="text-muted-foreground">
              ユーザーは、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、
              または担保に供することはできません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第14条（準拠法・裁判管轄）</h2>
            <p className="text-muted-foreground">
              本規約の解釈にあたっては、日本法を準拠法とします。
              本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第15条（お問い合わせ）</h2>
            <p className="text-muted-foreground">
              本サービスに関するお問い合わせは、以下の方法でお願いいたします。
            </p>
            <div className="mt-4 space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">お問い合わせ方法</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• メール：support@habitflow-pro.com</li>
                  <li>• アプリ内：設定 → ヘルプ → お問い合わせ</li>
                  <li>• 対応時間：平日 9:00-18:00（土日祝日を除く）</li>
                  <li>• 回答期間：通常3営業日以内</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">緊急時の連絡先</h3>
                <p className="text-sm text-muted-foreground">
                  セキュリティインシデントや重大な不具合については、24時間以内に回答いたします。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">第16条（会社情報）</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">運営会社</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>会社名：HabitFlow Pro株式会社</li>
                <li>代表取締役：田中 太郎</li>
                <li>所在地：〒100-0001 東京都千代田区千代田1-1-1</li>
                <li>設立：2024年1月1日</li>
                <li>事業内容：習慣管理アプリケーションの開発・運営</li>
              </ul>
            </div>
          </section>

          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              制定日：2024年1月1日<br />
              最終更新日：2024年12月19日
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
