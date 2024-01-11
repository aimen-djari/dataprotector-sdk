import './Footer.css';

export function Footer() {
  return (
    <>
      <hr className="mt-24" />
      <div className="mb-32 mt-7 flex gap-x-5 items-center">
        <div className="flex-1 text-xs">
          © 2024 iExec. All rights reserved.
        </div>
        <div className="flex flex-1 justify-center gap-x-5">
          {/* X */}
          <a
            href="https://x.com/iEx_ec"
            target="_blank"
            rel="noopener"
            className="hover-style -m-1 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M22.9595 7.583C22.9758 7.81031 22.9758 8.03767 22.9758 8.26498C22.9758 15.1983 17.6987 23.187 8.0537 23.187C5.08226 23.187 2.32194 22.3264 0 20.8327C0.422185 20.8813 0.828076 20.8976 1.26651 20.8976C3.7183 20.8976 5.97532 20.0695 7.77766 18.6569C5.47196 18.6081 3.53972 17.0981 2.87398 15.0197C3.19875 15.0684 3.52347 15.1009 3.86449 15.1009C4.33536 15.1009 4.80627 15.0359 5.24465 14.9223C2.84154 14.4351 1.03914 12.3243 1.03914 9.77504V9.71011C1.73732 10.0998 2.54925 10.3434 3.40977 10.3758C1.99712 9.43402 1.07163 7.82655 1.07163 6.00796C1.07163 5.03374 1.33138 4.14069 1.78605 3.3613C4.36779 6.5438 8.24853 8.62214 12.6001 8.8495C12.5189 8.4598 12.4702 8.05391 12.4702 7.64797C12.4702 4.7577 14.8084 2.40332 17.7148 2.40332C19.2249 2.40332 20.5888 3.03657 21.5468 4.05952C22.7321 3.83221 23.8687 3.39378 24.8755 2.79302C24.4857 4.01084 23.6577 5.03379 22.5698 5.68324C23.6252 5.56963 24.6482 5.2773 25.5899 4.87141C24.8756 5.91055 23.9825 6.83604 22.9595 7.583Z"
                fill="white"
              />
            </svg>
          </a>

          {/* Send */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="26"
            viewBox="0 0 27 26"
            fill="none"
          >
            <path
              d="M24.5257 4.92811L21.147 20.8619C20.8921 21.9864 20.2273 22.2663 19.2827 21.7365L14.1347 17.943L11.6507 20.3321C11.3758 20.607 11.1459 20.8369 10.6161 20.8369L10.9859 15.5939L20.5272 6.97231C20.9421 6.60246 20.4373 6.39754 19.8825 6.76739L8.08708 14.1945L3.00906 12.6051C1.90449 12.2602 1.8845 11.5005 3.23897 10.9708L23.1012 3.31874C24.0209 2.97388 24.8255 3.52366 24.5257 4.92811Z"
              fill="white"
            />
          </svg>

          {/* Discord */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M21.1729 5.35174C21.1664 5.33908 21.1556 5.32916 21.1424 5.32375C19.6181 4.62437 18.0095 4.12566 16.3568 3.84009C16.3418 3.8373 16.3263 3.83931 16.3125 3.84585C16.2987 3.85238 16.2873 3.8631 16.2799 3.87648C16.0609 4.27404 15.8621 4.6824 15.6842 5.1C13.9027 4.82958 12.0907 4.82958 10.3092 5.1C10.1302 4.68134 9.92814 4.27287 9.70407 3.87648C9.69638 3.86339 9.68493 3.85292 9.67121 3.84643C9.65749 3.83994 9.64213 3.83773 9.62714 3.84009C7.97434 4.12506 6.36562 4.62381 4.84149 5.32379C4.82844 5.32932 4.81743 5.33877 4.80998 5.35082C1.76201 9.90256 0.927058 14.3424 1.33666 18.7272C1.33781 18.738 1.34111 18.7484 1.34637 18.7578C1.35162 18.7673 1.35872 18.7756 1.36725 18.7822C3.14205 20.0963 5.12719 21.0994 7.23795 21.7486C7.25282 21.7531 7.26869 21.7529 7.28344 21.748C7.29818 21.7432 7.3111 21.734 7.32044 21.7216C7.77379 21.1047 8.17548 20.4515 8.52145 19.7687C8.5262 19.7593 8.52892 19.749 8.52941 19.7385C8.52991 19.728 8.52818 19.7176 8.52433 19.7078C8.52048 19.698 8.5146 19.6891 8.50708 19.6818C8.49956 19.6745 8.49057 19.6688 8.48071 19.6652C7.84726 19.4228 7.234 19.1306 6.6467 18.7914C6.63603 18.7851 6.62707 18.7763 6.62061 18.7658C6.61415 18.7552 6.61039 18.7432 6.60966 18.7309C6.60893 18.7185 6.61125 18.7062 6.61642 18.6949C6.62159 18.6837 6.62945 18.6739 6.63931 18.6664C6.76254 18.5741 6.88585 18.4781 7.00352 18.3811C7.01398 18.3724 7.02663 18.3669 7.04005 18.3651C7.05347 18.3633 7.06713 18.3653 7.07949 18.3708C10.9272 20.1268 15.0928 20.1268 18.8949 18.3708C18.9073 18.3649 18.9211 18.3627 18.9347 18.3643C18.9483 18.366 18.9612 18.3715 18.9718 18.3801C19.0895 18.4771 19.2128 18.5741 19.3369 18.6664C19.3469 18.6738 19.3548 18.6836 19.36 18.6948C19.3653 18.706 19.3677 18.7183 19.3671 18.7306C19.3664 18.743 19.3627 18.755 19.3564 18.7656C19.35 18.7762 19.3411 18.7851 19.3305 18.7914C18.7445 19.1335 18.1307 19.4255 17.4956 19.6643C17.4857 19.668 17.4768 19.6738 17.4693 19.6813C17.4618 19.6887 17.456 19.6977 17.4522 19.7075C17.4485 19.7174 17.4468 19.7279 17.4474 19.7385C17.448 19.749 17.4508 19.7593 17.4556 19.7687C17.8074 20.4478 18.2085 21.1001 18.6557 21.7205C18.6648 21.7332 18.6776 21.7428 18.6924 21.7478C18.7072 21.7528 18.7232 21.7531 18.7382 21.7485C20.8527 21.1015 22.8413 20.0983 24.6184 18.7822C24.627 18.7759 24.6342 18.7678 24.6395 18.7585C24.6448 18.7492 24.648 18.7388 24.649 18.7282C25.1393 13.6588 23.828 9.25537 21.1729 5.35174ZM9.09607 16.0573C7.93764 16.0573 6.98313 14.9943 6.98313 13.6887C6.98313 12.3831 7.91913 11.32 9.09607 11.32C10.2822 11.32 11.2275 12.3923 11.209 13.6886C11.209 14.9943 10.2729 16.0573 9.09607 16.0573ZM16.9082 16.0573C15.7498 16.0573 14.7953 14.9943 14.7953 13.6887C14.7953 12.3831 15.7313 11.32 16.9082 11.32C18.0944 11.32 19.0397 12.3923 19.0211 13.6886C19.0211 14.9943 18.0944 16.0573 16.9082 16.0573Z"
              fill="white"
            />
          </svg>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/channel/UCwWxZWvKVHn3CXnmDooLWtA"
            target="_blank"
            rel="noopener"
            className="hover-style -m-1 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
            >
              <path
                d="M25.2196 6.93396C24.9406 5.88326 24.1184 5.05576 23.0745 4.77494C21.1824 4.26465 13.5951 4.26465 13.5951 4.26465C13.5951 4.26465 6.00781 4.26465 4.11562 4.77494C3.07172 5.05581 2.24955 5.88326 1.9705 6.93396C1.4635 8.83842 1.4635 12.8119 1.4635 12.8119C1.4635 12.8119 1.4635 16.7854 1.9705 18.6898C2.24955 19.7405 3.07172 20.5335 4.11562 20.8144C6.00781 21.3246 13.5951 21.3246 13.5951 21.3246C13.5951 21.3246 21.1823 21.3246 23.0745 20.8144C24.1184 20.5335 24.9406 19.7405 25.2196 18.6898C25.7266 16.7854 25.7266 12.8119 25.7266 12.8119C25.7266 12.8119 25.7266 8.83842 25.2196 6.93396ZM11.1136 16.4195V9.20427L17.4551 12.812L11.1136 16.4195Z"
                fill="white"
              />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/iExecBlockchainComputing"
            target="_blank"
            rel="noopener"
            className="hover-style -m-1 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M9.09169 19.8628C9.09169 19.9627 8.97673 20.0427 8.83179 20.0427C8.66685 20.0577 8.5519 19.9777 8.5519 19.8628C8.5519 19.7628 8.66685 19.6829 8.8118 19.6829C8.96174 19.6679 9.09169 19.7478 9.09169 19.8628ZM7.53729 19.6379C7.50231 19.7378 7.60227 19.8528 7.75221 19.8828C7.88216 19.9328 8.0321 19.8828 8.06209 19.7828C8.09208 19.6829 7.99711 19.5679 7.84717 19.5229C7.71722 19.4879 7.57228 19.5379 7.53729 19.6379ZM9.74643 19.5529C9.60149 19.5879 9.50153 19.6829 9.51652 19.7978C9.53151 19.8978 9.66146 19.9627 9.81141 19.9278C9.95635 19.8928 10.0563 19.7978 10.0413 19.6978C10.0263 19.6029 9.89137 19.5379 9.74643 19.5529ZM13.0351 0.400391C6.10285 0.400391 0.799927 5.66333 0.799927 12.5956C0.799927 18.1385 4.28856 22.8816 9.27162 24.551C9.91137 24.6659 10.1363 24.2711 10.1363 23.9462C10.1363 23.6363 10.1213 21.927 10.1213 20.8774C10.1213 20.8774 6.62265 21.6271 5.88794 19.388C5.88794 19.388 5.31816 17.9335 4.49848 17.5587C4.49848 17.5587 3.35393 16.774 4.57845 16.789C4.57845 16.789 5.82296 16.8889 6.5077 18.0785C7.60227 20.0077 9.43655 19.4529 10.1513 19.1231C10.2662 18.3234 10.5911 17.7686 10.951 17.4387C8.15705 17.1289 5.33815 16.724 5.33815 11.9159C5.33815 10.5414 5.71801 9.8517 6.51769 8.97204C6.38774 8.64717 5.96291 7.30769 6.64764 5.57837C7.69223 5.25349 10.0963 6.92784 10.0963 6.92784C11.0959 6.64795 12.1705 6.50301 13.2351 6.50301C14.2997 6.50301 15.3742 6.64795 16.3738 6.92784C16.3738 6.92784 18.7779 5.2485 19.8225 5.57837C20.5072 7.31269 20.0824 8.64717 19.9524 8.97204C20.7521 9.8567 21.2419 10.5464 21.2419 11.9159C21.2419 16.739 18.2981 17.1239 15.5042 17.4387C15.964 17.8336 16.3538 18.5833 16.3538 19.7578C16.3538 21.4422 16.3389 23.5264 16.3389 23.9362C16.3389 24.2611 16.5688 24.6559 17.2035 24.541C22.2016 22.8816 25.5902 18.1385 25.5902 12.5956C25.5902 5.66333 19.9674 0.400391 13.0351 0.400391ZM5.65803 17.6387C5.59305 17.6886 5.60805 17.8036 5.69301 17.8986C5.77298 17.9785 5.88794 18.0135 5.95291 17.9485C6.01789 17.8986 6.00289 17.7836 5.91793 17.6886C5.83796 17.6087 5.723 17.5737 5.65803 17.6387ZM5.11824 17.2338C5.08325 17.2988 5.13323 17.3788 5.23319 17.4287C5.31316 17.4787 5.41312 17.4637 5.44811 17.3937C5.4831 17.3288 5.43312 17.2488 5.33316 17.1988C5.23319 17.1688 5.15323 17.1838 5.11824 17.2338ZM6.73761 19.0131C6.65764 19.0781 6.68763 19.228 6.80258 19.323C6.91754 19.438 7.06248 19.4529 7.12745 19.373C7.19243 19.308 7.16244 19.1581 7.06248 19.0631C6.95252 18.9481 6.80258 18.9331 6.73761 19.0131ZM6.16783 18.2784C6.08786 18.3284 6.08786 18.4583 6.16783 18.5733C6.2478 18.6882 6.38275 18.7382 6.44772 18.6882C6.52769 18.6233 6.52769 18.4933 6.44772 18.3784C6.37775 18.2634 6.2478 18.2134 6.16783 18.2784Z"
                fill="white"
              />
            </svg>
          </a>

          {/* Facebook */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M18.7497 14.3944L19.4604 9.76318H15.0167V6.75786C15.0167 5.49085 15.6374 4.25584 17.6276 4.25584H19.6478V0.312878C19.6478 0.312878 17.8146 0 16.0617 0C12.4022 0 10.0101 2.21813 10.0101 6.23356V9.76318H5.9422V14.3944H10.0101V25.59H15.0167V14.3944H18.7497Z"
              fill="white"
            />
          </svg>

          {/* Medium */}
          <a
            href="https://medium.com/iex-ec"
            target="_blank"
            rel="noopener"
            className="hover-style -m-1 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
            >
              <path
                d="M15.0343 12.7949C15.0343 16.7693 11.8036 19.992 7.81636 19.992C6.86995 19.9933 5.93256 19.8081 5.05771 19.4471C4.18286 19.0861 3.38768 18.5563 2.71758 17.888C2.04747 17.2197 1.51557 16.4259 1.15223 15.552C0.788891 14.6782 0.601235 13.7413 0.599976 12.7949C0.599976 8.81881 3.83071 5.59766 7.81636 5.59766C8.7629 5.59619 9.70046 5.7812 10.5755 6.14212C11.4505 6.50303 12.2459 7.03279 12.9162 7.70113C13.5864 8.36947 14.1185 9.16331 14.4819 10.0373C14.8454 10.9113 15.0331 11.8483 15.0343 12.7949ZM22.9512 12.7949C22.9512 16.5374 21.3359 19.5698 19.3431 19.5698C17.3502 19.5698 15.7349 16.5358 15.7349 12.7949C15.7349 9.05231 17.3502 6.0199 19.3431 6.0199C21.3359 6.0199 22.9512 9.05391 22.9512 12.7949ZM26.19 12.7949C26.19 16.1471 25.6222 18.8645 24.9201 18.8645C24.2195 18.8645 23.6518 16.1455 23.6518 12.7949C23.6518 9.44256 24.2195 6.72522 24.9217 6.72522C25.6222 6.72522 26.19 9.44256 26.19 12.7949Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
        <div className="flex-1 text-right text-xs">
          <a href="#" target="_blank" className="underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </>
  );
}
